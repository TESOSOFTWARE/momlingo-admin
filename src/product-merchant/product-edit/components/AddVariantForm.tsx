import { Box, Divider, FormLabel, Grid, Stack, Typography } from '@mui/material';
import lodash from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Iconify from '../../../common/components/Iconify';
import { dispatch } from '../../../common/redux/store';
import { Variant } from '../../product-common/components/VariantTable/interface';
import { defaultVariantId, selectVariantId, setDefaultVariantId } from '../slice';

type detailVariantProps = {
  detailVariants: Variant | undefined;
  handleDelete: VoidFunction;
  defaultId: number;
};

export default function AddVariantForm({
  detailVariants,
  defaultId,
  handleDelete,
}: detailVariantProps) {
  const { t } = useTranslation();
  const defaultIdVariant = useSelector(defaultVariantId);
  const listIdVariant = useSelector(selectVariantId);

  useEffect(() => {
    if (listIdVariant.length > 0) {
      dispatch(setDefaultVariantId(listIdVariant[0]));
    }
  }, [listIdVariant]);

  const handleDefaultVariant = (id: number) => {
    if (id === defaultId) {
      dispatch(setDefaultVariantId(id));
    }
  };

  return (
    <Stack
      direction="row"
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#8080801f',
        borderTop: '1px solid #F7F9FA',
        borderBottom: '1px solid #F7F9FA',
        padding: '10px',
        borderRadius: '7px',
        position: 'relative',
        marginTop: '5px',
        border: defaultIdVariant === defaultId ? '2px solid #26C368' : 'none',
        maxWidth: '95%',
      }}
      onClick={() => handleDefaultVariant(detailVariants?.id || 0)}
    >
      <Iconify
        onClick={() => handleDelete()}
        icon="tabler:trash-x"
        sx={{
          position: 'absolute',
          right: -49,
          fontSize: '30px',
          opacity: '0.4',
          '&:hover': { color: 'red', cursor: 'pointer' },
        }}
      />
      {defaultIdVariant === defaultId && (
        <Box
          sx={{
            position: 'absolute',
            right: 4,
            fontSize: '10px',
            top: 0,
            boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
            borderRadius: '5px',
            padding: '1px',
          }}
        >
          {t('productMerchant.new.default')}
        </Box>
      )}

      <Box
        key={detailVariants?.id}
        component="img"
        sx={{
          height: 60,
          width: 60,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
          borderRadius: '7px',
          border: '1px solid grey',
        }}
        alt={
          lodash.isEmpty(detailVariants?.images)
            ? `no-images`
            : `${detailVariants?.images[0].key}`
        }
        src={
          lodash.isEmpty(detailVariants?.images)
            ? `no-images`
            : `${detailVariants?.images[0].url}`
        }
      ></Box>

      <Grid container direction="row" sx={{ paddingLeft: '12px' }}>
        <Grid item xs={3}>
          <FormLabel>{t('productMerchant.new.price')}</FormLabel>
        </Grid>
        <Grid item xs={3}>
          <Typography>{detailVariants?.price}</Typography>
        </Grid>

        <Grid item xs={3}>
          <FormLabel>{t('productMerchant.new.salePrice')}</FormLabel>
        </Grid>
        <Grid item xs={3}>
          <Typography>{detailVariants?.salePrice}</Typography>
        </Grid>

        <Divider sx={{ border: '1px solid #ccc', width: '100%' }} />

        <Grid item xs={3}>
          <FormLabel>{t('productMerchant.new.point')}</FormLabel>
        </Grid>
        <Grid item xs={3}>
          <Typography>{detailVariants?.productVariantPoint.point}</Typography>
        </Grid>

        <Grid item xs={3}>
          <FormLabel>{t('productMerchant.new.salePoint')}</FormLabel>
        </Grid>
        <Grid item xs={3}>
          <Typography>{detailVariants?.productVariantPoint.salePoint}</Typography>
        </Grid>

        <Divider sx={{ border: '1px solid #ccc', width: '100%' }} />

        <Grid item xs={3}>
          <FormLabel>{t('productMerchant.new.quantity')}</FormLabel>
        </Grid>
        <Grid item xs={3}>
          <Typography>{detailVariants?.quantity}</Typography>
        </Grid>

        <Grid item xs={3}>
          <FormLabel>{t('productMerchant.new.sku')}</FormLabel>
        </Grid>
        <Grid item xs={3}>
          <Typography>{detailVariants?.sku}</Typography>
        </Grid>

        <Divider sx={{ border: '1px solid #ccc', width: '100%' }} />

        {detailVariants?.productAttributeTerms.map((item) => (
          <>
            <Grid item xs={3}>
              <FormLabel>
                {item.productAttribute.productAttributeDetails[0].name}
              </FormLabel>
            </Grid>
            <Grid item xs={3}>
              {item.productAttributeTermDetails.map((term) => (
                <>
                  <Typography>{term.value}</Typography>
                </>
              ))}
            </Grid>
            <Divider sx={{ border: '1px solid #ccc', width: '100%' }} />
          </>
        ))}
      </Grid>
    </Stack>
  );
}
