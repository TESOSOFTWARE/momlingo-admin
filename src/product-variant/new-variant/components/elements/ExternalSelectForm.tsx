import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RHFSelect } from '../../../../common/components/hook-form';
import { TypesExternal } from '../../constant';
import { RHFSelectPaginationExternal } from './RHFSelectPaginationExternal';
import { getExternalProduct } from '../../service';

type ExternalProps = {
  errors: any;
  watch: any;
};
export default function ExternalSelectForm({ errors, watch }: ExternalProps) {
  const { t } = useTranslation();
  const exType = watch('types');

  return (
    <>
      <Typography sx={{ fontSize: '20px', fontWeight: 600, fontStyle: 'italic' }}>
        *E-Voucher
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography sx={{ fontStyle: 'italic', color: '#999999', fontSize: 'small' }}>
            {t('variant.new.labelExNote')}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <RHFSelect
            name={'types'}
            label="Loại biến thể"
            size="small"
            sx={{ display: 'flex', maxWidth: 'min-content' }}
            defaultValue={''}
          >
            <option value={''}></option>
            {TypesExternal.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </RHFSelect>
        </Grid>
        {exType === 'VOUCHER' && (
          <>
            <Grid item xs={11}>
              <RHFSelectPaginationExternal
                name={'externalProductId'}
                getAsyncData={getExternalProduct}
                placeholder={t('variant.new.labelExternal')}
                error={errors}
                types={'VOUCHER'}
              />
            </Grid>
          </>
        )}
        {exType === 'All' && (
          <>
            <Grid item xs={11}>
              <RHFSelectPaginationExternal
                name={'externalProductId'}
                getAsyncData={getExternalProduct}
                placeholder={t('variant.new.labelExternal')}
                error={errors}
                types={'All'}
              />
            </Grid>
          </>
        )}
        {exType === 'TOPUP' && (
          <>
            <Grid item xs={11}>
              <RHFSelectPaginationExternal
                name={'externalProductId'}
                getAsyncData={getExternalProduct}
                placeholder={t('variant.new.labelExternal')}
                error={errors}
                types={'TOPUP'}
              />
            </Grid>
          </>
        )}
        {exType === 'UNKNOWN' && (
          <>
            <Grid item xs={11}>
              <RHFSelectPaginationExternal
                name={'externalProductId'}
                getAsyncData={getExternalProduct}
                placeholder={t('variant.new.labelExternal')}
                error={errors}
                types={'UNKNOWN'}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
