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
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
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
} from '../../constants';

import { useEffect } from 'react';
import { useGetUserById } from '../../hooks/useGetUserById';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import { formatDate, formatDateNoTime } from '../../../common/constants/common.utils';
import { IFormEditUser, IUser } from '../../interfaces';

type Props = {
  data?: IUser;
  isLoading: boolean;
};

export default function FormUserDetail({ data, isLoading }: Props) {
  const navigate = useNavigate();
  const methods = useForm<any>({
    // resolver: yupResolver(schemaCreateSpoon),
    defaultValues: DEFAULT_VALUE_USER_BY_ID,
  });
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;
  const { id: idUser } = useParams();

  const { useDeepCompareEffect } = useDeepEffect();

  useDeepCompareEffect(() => {
    reset(data);
    setValue('totalPoints', data?.userPoint?.totalPoints);
    setValue('createdAt', formatDate(data?.createdAt));
    setValue('lastVisitDate', formatDate(data?.lastVisitDate));
    setValue('lastScanDate', formatDate(data?.lastScanDate));
    setValue('birthDate', formatDateNoTime(data?.birthDate));
    setValue('blockAccount', data?.blockAccount ? 'Khóa' : 'Hoạt động');
    setValue('blockAddPoint', data?.blockAddPoint ? 'Có' : 'Không');
    setValue('email', data?.email === null ? '' : data?.email);
  }, [data]);

  const onSubmit = () => {};

  return (
    <>
      <Paper elevation={3} sx={{ boxShadow: 10, padding: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={'column'} spacing={3}>
            <Stack direction={'row'} spacing={2}>
              <RHFTextField
                name="name"
                label={`${i18n.t('userManage.name')}`}
                disabled
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                name="gender"
                label={`${i18n.t('userManage.gender')}`}
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </Stack>

            <Stack direction={'row'} spacing={2}>
              <RHFTextField
                name="email"
                label={`${i18n.t('userManage.email')}`}
                disabled
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                name="phoneNumber"
                label={`${i18n.t('userManage.phoneNumber')}`}
                disabled
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            {/* <RHFTextField
              name="fullAddress"
              label={`${i18n.t('userManage.address')}`}
              disabled
              InputLabelProps={{ shrink: true }}
            />
            <Stack direction={'row'} spacing={2}>
              <RHFTextField
                name="birthDate"
                label={`${i18n.t('userManage.birth')}`}
                disabled
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                name="tierCode"
                label={`${i18n.t('userManage.rank')}`}
                disabled
                InputLabelProps={{ shrink: true }}
              />
            </Stack> */}
            <Stack direction={'row'} spacing={2}>
              <RHFTextField
                name="lastVisitDate"
                label={`${i18n.t('userManage.lastVisited')}`}
                disabled
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                name="createdAt"
                label={`${i18n.t('userManage.createdAt')}`}
                disabled
                InputLabelProps={{ shrink: true }}
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
              <LoadingButton
                variant="contained"
                loading={isSubmitting}
                onClick={() =>
                  navigate(
                    PATH_DASHBOARD.userManagement.editUser(parseInt(idUser as string))
                  )
                }
              >
                {`${i18n.t('userManage.edit')}`}
              </LoadingButton>
            </Stack>
          </Stack>
        </FormProvider>
      </Paper>
    </>
  );
}
