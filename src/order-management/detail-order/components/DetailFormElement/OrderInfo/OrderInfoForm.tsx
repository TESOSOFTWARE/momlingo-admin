import { Card, Grid, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RHFTextField } from '../../../../../common/components/hook-form';
import { EnumType } from '../../../../common/interface';

type Props = {
  type?: string;
};

export default function OrderInfoForm({ type }: Props) {
  const { t } = useTranslation();
  return (
    <>
      <Card sx={{ padding: 3, marginBottom: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <RHFTextField
              disabled
              name="id"
              label="Id"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              disabled
              name="status"
              label={t('order.detail.labelStatus')}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              disabled
              name="customerName"
              label={t('order.detail.customerName')}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              disabled
              name="phoneNumber"
              label={t('order.detail.userPhone')}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {type === EnumType.PHYSICAL ? (
            <>
              <Grid item xs={6}>
                <RHFTextField
                  disabled
                  name="total"
                  label={t('order.detail.totalMoney')}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField
                  disabled
                  name="discountTotal"
                  label={t('order.detail.totalDiscount')}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField
                  disabled
                  name="shippingTotal"
                  label={t('order.detail.totalShipfee')}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField
                  disabled
                  name="createdAt"
                  label={t('order.detail.createdOrder')}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField
                  disabled
                  name="paidAt"
                  label={t('order.detail.payOrder')}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField
                  disabled
                  name="transactionId"
                  label={t('order.detail.code')}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField
                  disabled
                  name="note"
                  label={t('order.detail.note')}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
      </Card>
    </>
  );
}
