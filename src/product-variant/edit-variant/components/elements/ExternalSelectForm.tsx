import { Button, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { RHFSelect } from '../../../../common/components/hook-form';
import { TypesExternal } from '../../../new-variant/constant';
import { getExternalProduct } from '../../../new-variant/service';
import { RHFSelectPaginationExternal } from './RHFSelectPaginationExternal';
import Iconify from '../../../../common/components/Iconify';
import { useFormContext } from 'react-hook-form';

type ExternalProps = {
  errors: any;
  watch: any;
};
export default function ExternalSelectForm({ errors, watch }: ExternalProps) {
  const { t } = useTranslation();
  const exType = watch('types');
  const methods = useFormContext();
  const { setValue } = methods;

  const handleClick = () => {
    setValue('externalProductId', { value: null, label: null, images: null });
  };

  return (
    <>
      <Typography sx={{ fontSize: '20px', fontWeight: 600, fontStyle: 'italic' }}>
        {t('variant.new.labelExternal')}
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
            label={t('variant.edit.typeEx')}
            size="small"
            sx={{ display: 'flex', maxWidth: 'min-content' }}
            defaultValue={''}
          >
            <option value={''}> </option>
            {TypesExternal.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </RHFSelect>
        </Grid>
        <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Tooltip title="Xóa Voucher" placement="top-start">
            <Button size="small" sx={{ marginTop: 1 }} onClick={handleClick}>
              {<Iconify icon="mdi:trash-can-circle-outline" fontSize={'30px'} />}
            </Button>
          </Tooltip>
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
        {exType === undefined && (
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
