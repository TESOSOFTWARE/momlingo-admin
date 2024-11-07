import { Card, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RHFTextField } from '../../../../../common/components/hook-form';

export default function ShippingInfoForm() {
  const { t } = useTranslation();
  return (
    <>
      <Card sx={{ padding: 3, marginBottom: 4 }}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={3}>
            <RHFTextField
              disabled
              name="idShipping"
              label="Id"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <RHFTextField
              disabled
              name="userId"
              label={t('order.detail.idUser')}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
          <Stack direction="row" spacing={3}>
            <RHFTextField
              disabled
              name="name"
              label={t('order.detail.userName')}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <RHFTextField
              disabled
              name="phone"
              label={t('order.detail.userPhoneNumber')}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
          <RHFTextField
            disabled
            name="expressDeliveryCode"
            label={'Mã giao hàng'}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <RHFTextField
            disabled
            name="address"
            label={t('order.detail.userAddress')}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
      </Card>
    </>
  );
}
