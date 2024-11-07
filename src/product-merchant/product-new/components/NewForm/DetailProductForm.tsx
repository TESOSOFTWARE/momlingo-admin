import { FormHelperText, FormLabel, Paper, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  RHFEditor,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../../../common/components/hook-form';
import { fData } from '../../../../common/utils/formatNumber';
import debounce from 'lodash/debounce';
import { useFormContext } from 'react-hook-form';
import slugify from 'slugify';
import { useState } from 'react';

type DetailProps = {
  handleDrop: (acceptedFiles: File[]) => void;
  errors: string | undefined;
  handleClickAdd: VoidFunction;
};

export default function DetailProductForm({
  handleDrop,
  errors,
  handleClickAdd,
}: DetailProps) {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { setValue, watch } = methods;
  const [slug, setSlug] = useState('');

  const getValue = debounce(() => {
    const titleName = watch('name');
    setSlug(slugify(titleName));
  }, 500);

  getValue();

  const handleBlur = debounce(() => {
    setValue('slug', slug);
  }, 250);

  return (
    <Stack direction="column" spacing={3}>
      <Paper elevation={3}>
        <Stack spacing={3} padding={3}>
          <RHFTextField
            name="name"
            label={t('productMerchant.new.labelName')}
            onBlur={handleBlur}
          />
          <RHFTextField name="slug" label={t('productMerchant.new.slug')} />
          <RHFTextField
            name="shortDescription"
            label={t('productMerchant.new.labelShortDescription')}
          />

          <Stack spacing={1}>
            <FormLabel sx={{ marginLeft: '14px' }}>
              {t('productMerchant.new.description')}
            </FormLabel>
            <RHFEditor name="description" />
          </Stack>

          <Stack spacing={1}>
            <FormLabel sx={{ marginLeft: '14px' }}>
              {t('productMerchant.new.images')}
            </FormLabel>

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
                  {t('productMerchant.new.allow')} *.jpeg, *.jpg, *.png, *.gif
                  <br />
                  {t('productMerchant.new.maxSize')}: {fData(3145728)}
                </Typography>
              }
            />
            {
              <FormHelperText
                sx={{ color: 'red', paddingLeft: '17px', marginTop: '-10px' }}
              >
                {errors}
              </FormHelperText>
            }
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
