import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, MenuItem, Paper, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import useMessage from 'src/common/hooks/useMessage';
import i18n from 'src/common/locales/i18n';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { DEFAULT_VALUE_USER_BY_ID, TYPE_GENDER } from '../../constants';

import { useEffect } from 'react';
import { formatDate } from '../../../common/constants/common.utils';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import useEditUser from '../../hooks/useEditUser';
import { useGetUserById } from '../../hooks/useGetUserById';
import { IFormEditUser } from '../../interfaces';
import { schemaEditUser } from '../../schema';
import { useGetProvince } from '../hooks/useGetProvince';

export default function FormEditUser() {
  const navigate = useNavigate();
  const methods = useForm<IFormEditUser>({
    resolver: yupResolver(schemaEditUser),
    defaultValues: DEFAULT_VALUE_USER_BY_ID,
  });
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;

  const dispatch = useDispatch();
  const { id } = useParams();

  const { useDeepCompareEffect } = useDeepEffect();

  const { data, isLoading, refetch } = useGetUserById(Number(id));

  useDeepCompareEffect(() => {
    if (data) {
      reset(data);
      setValue('provinceId', data?.province);
      setValue('districtId', data?.district || null);
      setValue('wardId', data?.ward || null);
      setValue('totalPoints', data?.userPoint?.totalPoints);
      setValue('createdAt', formatDate(data?.createdAt));
      setValue('lastVisitDate', formatDate(data?.lastVisitDate));
      setValue('lastScanDate', formatDate(data?.lastScanDate));
      setValue('birthDate', data?.birthDate);
    }
  }, [data]);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { data: listProvince } = useGetProvince({
    type: 'PROVINCE',
    page: 1,
    limit: 100,
  });
  const provinceData = listProvince?.items || [];

  const { data: listDistrict } = useGetProvince({
    parentId: watch('provinceId')?.id,
    type: 'DISTRICT',
    page: 1,
    limit: 100,
  });
  const districtData = listDistrict?.items || [];

  const { data: listWard } = useGetProvince({
    parentId: watch('districtId')?.id || 0,
    type: 'WARD',
    page: 1,
    limit: 100,
  });
  const wardData = listWard?.items || [];
  const { mutate } = useEditUser({
    onSuccess: () => {
      showSuccessSnackbar('Chỉnh sửa thành công !');
      navigate(PATH_DASHBOARD.userManagement.view(parseInt(id as string)));
      refetch();
    },
    onError: () => {
      showErrorSnackbar('Chỉnh sửa thất bại !');
    },
  });

  const onSubmit = (dataSubmit: any) => {
    const dataEditUser = {
      id: parseInt(id as string),
      data: {
        name: dataSubmit?.name === '' ? null : dataSubmit?.name,
        email: dataSubmit?.email === '' ? null : dataSubmit?.email,
        gender: dataSubmit?.gender === '' ? null : dataSubmit?.gender,
        blockAccount:
          dataSubmit.blockAccount === data?.blockAccount
            ? undefined
            : dataSubmit.blockAccount,
        blockAddPoint:
          dataSubmit.blockAddPoint === data?.blockAddPoint
            ? undefined
            : dataSubmit.blockAddPoint,
        totalPoints:
          dataSubmit.totalPoints === data?.userPoint?.totalPoints
            ? undefined
            : dataSubmit.totalPoints,
      },
    };
    mutate(dataEditUser);
  };
  useEffect(() => {
    if (data?.province?.id !== watch('provinceId')?.id) {
      setValue('wardId', null);
      setValue('districtId', null);
    }
  }, [watch('provinceId')?.id]);
  return (
    <Paper elevation={3} sx={{ boxShadow: 10, padding: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={'column'} spacing={3}>
          <Stack direction={'row'} spacing={2}>
            <RHFTextField name="name" label={`${i18n.t('userManage.name')}`} />
            <RHFSelect
              name="gender"
              label={`${i18n.t('userManage.gender')}`}
              SelectProps={{ native: false }}
            >
              <MenuItem value={''} disabled></MenuItem>
              {TYPE_GENDER.map((gender, index) => (
                <MenuItem value={gender.value} key={index}>
                  {gender.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Stack>

          <Stack direction={'row'} spacing={2}>
            <RHFTextField name="email" label={`${i18n.t('userManage.email')}`} />
            <RHFTextField
              name="phoneNumber"
              label={`${i18n.t('userManage.phoneNumber')}`}
              disabled
            />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <RHFTextField
              name="lastVisitDate"
              label={`${i18n.t('userManage.lastVisited')}`}
              InputLabelProps={{ shrink: true }}
              disabled
            />
            <RHFTextField
              name="createdAt"
              label={`${i18n.t('userManage.createdAt')}`}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Stack>
          <Stack justifyContent="flex-end" direction="row" spacing={3}>
            <Button
              color="inherit"
              variant="contained"
              onClick={() => navigate(PATH_DASHBOARD.userManagement.list)}
            >
              {`${i18n.t('userManage.goBack')}`}
            </Button>
            <LoadingButton variant="contained" loading={isSubmitting} type="submit">
              {`${i18n.t('userManage.save')}`}
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Paper>
  );
}
