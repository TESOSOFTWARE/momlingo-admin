import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Container,
  FormLabel,
  Paper,
  Stack,
  TextField,
  Box,
  MenuItem,
} from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from 'src/common/components/hook-form';
import useMessage from 'src/common/hooks/useMessage';
import i18n from 'src/common/locales/i18n';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  DATA_LIST_USER,
  DEFAULT_LIMIT_SIZE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_VALUE_USER_BY_ID,
  TYPE_GENDER,
  UserGender,
  UserRank,
} from '../../constants';

import { useEffect } from 'react';
import { useGetUserById } from '../../hooks/useGetUserById';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import { formatDate, formatDateNoTime } from '../../../common/constants/common.utils';
import { schemaEditUser } from '../../schema';
import useEditUser from '../../hooks/useEditUser';
import { IFormEditUser, IUser } from '../../interfaces';
import { useGetProvince } from '../hooks/useGetProvince';
import RHFSearchSelect from '../../../common/components/hook-form/RHFSelectSearch';
import { watch } from 'fs';

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
        address: dataSubmit?.address === '' ? null : dataSubmit?.address,
        provinceId: dataSubmit?.provinceId?.id === '' ? null : dataSubmit?.provinceId?.id,
        wardId: dataSubmit?.wardId?.id === '' ? null : dataSubmit?.wardId?.id,
        districtId: dataSubmit?.districtId?.id === '' ? null : dataSubmit?.districtId?.id,
        birthDate: dataSubmit?.birthDate === '' ? null : dataSubmit?.birthDate,
        tierCode: dataSubmit?.tierCode,
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

          <RHFTextField name="address" label={`${i18n.t('userManage.address')}`} />
          <Stack direction={'row'} spacing={2}>
            <RHFSearchSelect
              name="provinceId"
              options={provinceData}
              labelProp="name"
              valueProp="id"
              label="Tỉnh thành"
            />
            <RHFSearchSelect
              name="districtId"
              options={districtData}
              labelProp="name"
              valueProp="id"
              label="Quận"
              disableSelect={watch('provinceId')?.id ? false : true}
            />
            <RHFSearchSelect
              name="wardId"
              options={wardData}
              labelProp="name"
              valueProp="id"
              label="Phường"
              disableSelect={watch('districtId')?.id ? false : true}
            />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <Stack position="relative" width="100%">
                  <DatePicker
                    {...field}
                    label="Ngày sinh"
                    inputFormat={'dd/MM/yyyy'}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        helperText={errors.birthDate && errors.birthDate?.message}
                        error={!!errors.birthDate}
                      />
                    )}
                  />
                </Stack>
              )}
            />
            <RHFSelect
              name="tierCode"
              label={`${i18n.t('userManage.rank')}`}
              SelectProps={{ native: false }}
            >
              <MenuItem value="" disabled />
              {Object.values(UserRank).map((valueRank) => (
                <MenuItem key={valueRank} value={valueRank}>
                  {valueRank}
                </MenuItem>
              ))}
            </RHFSelect>
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
          <Stack direction={'row'} spacing={2}>
            <RHFTextField
              type="number"
              name="totalPoints"
              label={`${i18n.t('userManage.totalPoints')}`}
              InputLabelProps={{ shrink: true }}
            />

            <RHFTextField
              name="lastScanDate"
              label={`${i18n.t('userManage.lastScan')}`}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <RHFSwitch
              name="blockAccount"
              label={`${i18n.t('userManage.blockAccount')}`}
            />
            <RHFSwitch name="blockAddPoint" label={`${i18n.t('userManage.block')}`} />
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
