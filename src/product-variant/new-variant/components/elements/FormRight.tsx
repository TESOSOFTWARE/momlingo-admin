import { FormHelperText, FormLabel, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  RHFTextField,
  RHFUploadSingleFile,
} from '../../../../common/components/hook-form';
import Iconify from '../../../../common/components/Iconify';
import { fData } from '../../../../common/utils/formatNumber';

type FormRightProps = {
  handleDrop: (acceptedFiles: File[]) => void;
  errors: any;
};
export default function FormRight({ handleDrop, errors }: FormRightProps) {
  const { t } = useTranslation();
  return (
    <>
      <Stack direction={'row'} spacing={3}>
        <RHFTextField
          name="price"
          label={t('variant.new.labelPrice')}
          InputProps={{
            endAdornment: (
              <Iconify
                icon="healthicons:money-bag-outline"
                sx={{ marginLeft: '3px', fontSize: '25px' }}
              />
            ),
          }}
        />
        <RHFTextField
          name="salePrice"
          label={t('variant.new.labelSale')}
          InputProps={{
            endAdornment: (
              <Iconify
                icon="mdi:sale-circle-outline"
                sx={{ marginLeft: '3px', fontSize: '25px' }}
              />
            ),
          }}
        />
      </Stack>
      <Stack direction={'row'} spacing={3}>
        <RHFTextField
          name="point"
          label={t('variant.new.labelPoint')}
          InputProps={{
            endAdornment: (
              <Iconify icon="wpf:coins" sx={{ marginLeft: '3px', fontSize: '25px' }} />
            ),
          }}
        />
        <RHFTextField
          name="salePoint"
          label={t('variant.new.labelSalePoint')}
          InputProps={{
            endAdornment: (
              <Iconify
                icon="mdi:sale-circle-outline"
                sx={{ marginLeft: '3px', fontSize: '25px' }}
              />
            ),
          }}
        />
      </Stack>
      <FormLabel sx={{ paddingLeft: 2 }}>Ảnh biến thể</FormLabel>
      <RHFUploadSingleFile
        name="photoURL"
        maxSize={3145728}
        onDrop={handleDrop}
        accept={{ 'image/*': [] }}
        helperText={
          <Typography
            variant="caption"
            sx={{
              mt: 2,
              mx: 'auto',
              display: 'block',
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            {t('variant.new.labelImg')} *.jpeg, *.jpg, *.png, *.gif
            <br />
            Max size: {fData(3145728)}
          </Typography>
        }
      />
      {
        <FormHelperText sx={{ color: 'red', paddingLeft: '17px', marginTop: '-10px' }}>
          {errors}
        </FormHelperText>
      }
    </>
  );
}
