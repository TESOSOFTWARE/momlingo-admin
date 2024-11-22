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
  Grid,
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

import { useEffect } from 'react';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import { formatDate, formatDateNoTime } from '../../../common/constants/common.utils';
import { DEFAULT_REFUND_FORM_VALUE } from '../../list-refund/constants';
import { useGetRefundOrderById } from '../../list-refund/hooks/useGetRefundOrderById';

export default function FormRefundOrderDetail() {
  const navigate = useNavigate();
  const methods = useForm<any>({
    // resolver: yupResolver(schemaCreateSpoon),
    defaultValues: DEFAULT_REFUND_FORM_VALUE,
  });
  const { t } = useTranslation();
  const { id } = useParams();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;

  const dispatch = useDispatch();
  const { id: idUser } = useParams();
  const { data, isLoading } = useGetRefundOrderById(parseInt(id as string));

  const { useDeepCompareEffect } = useDeepEffect();

  useDeepCompareEffect(() => {
    reset(data);
  }, [data]);

  const onSubmit = () => {};

  return (
    <>
      <Paper elevation={3} sx={{ boxShadow: 10, padding: 3 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={'column'} spacing={3}>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <RHFTextField name="id" label="ID" disabled />
              </Grid>
              <Grid item xs={4}>
                <RHFTextField
                  name="name"
                  label={t('order.detail.refundForm.name')}
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <RHFTextField
                  name="phoneNumber"
                  label={t('order.detail.refundForm.phoneNumber')}
                  disabled
                />
              </Grid>
              <Grid item xs={2}>
                <RHFTextField
                  name="type"
                  label={t('order.detail.refundForm.type')}
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <RHFTextField
                  name="refundPoint"
                  label={t('order.detail.refundForm.quantity')}
                  disabled
                />
              </Grid>
              <Grid item xs={8}>
                <RHFTextField
                  name="contentRefund"
                  label={t('order.detail.refundForm.content')}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField
                  name="createdAtOrder"
                  label={t('order.detail.refundForm.createdDate')}
                  disabled
                />
              </Grid>

              <Grid item xs={6}>
                <RHFTextField
                  name="refundDate"
                  label={t('order.detail.refundForm.refundDate')}
                  disabled
                />
              </Grid>
            </Grid>

            <Stack justifyContent="flex-end" direction="row" spacing={3}>
              <Button
                color="inherit"
                variant="contained"
                onClick={() => navigate(PATH_DASHBOARD.order_management.list_refund)}
              >
                {`${i18n.t('userManage.goBack')}`}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Paper>
    </>
  );
}
