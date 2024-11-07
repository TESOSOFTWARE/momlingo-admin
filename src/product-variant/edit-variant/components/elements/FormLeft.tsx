import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RHFSelect, RHFTextField } from '../../../../common/components/hook-form';
import Iconify from '../../../../common/components/Iconify';
import { variantLang } from '../../../new-variant/constant';

export default function FormLeft() {
  const { t } = useTranslation();
  return (
    <Stack direction={'column'} spacing={3}>
      <RHFTextField
        InputLabelProps={{ shrink: true }}
        name="name"
        label={t('variant.new.labelName')}
        InputProps={{
          endAdornment: (
            <Iconify icon="mdi:rename-box" sx={{ marginLeft: '3px', fontSize: '25px' }} />
          ),
        }}
      />
      <RHFTextField
        InputLabelProps={{ shrink: true }}
        name="sku"
        label={t('variant.new.labelSku')}
        InputProps={{
          endAdornment: (
            <Iconify
              icon="tabler:circle-letter-s"
              sx={{ marginLeft: '3px', fontSize: '25px' }}
            />
          ),
        }}
      />
      <RHFTextField
        InputLabelProps={{ shrink: true }}
        name="quantity"
        label={t('variant.new.labelQuantity')}
        InputProps={{
          endAdornment: (
            <Iconify
              icon="fluent-emoji-high-contrast:input-numbers"
              sx={{ marginLeft: '3px', fontSize: '25px' }}
            />
          ),
        }}
      />

      <RHFTextField
        InputLabelProps={{ shrink: true }}
        name="width"
        label="Chiều rộng"
        InputProps={{
          endAdornment: (
            <Iconify
              icon="fluent:arrow-autofit-width-24-regular"
              sx={{ marginLeft: '3px', fontSize: '25px' }}
            />
          ),
        }}
      />
      <RHFTextField
        InputLabelProps={{ shrink: true }}
        name="length"
        label="Chiều dài"
        InputProps={{
          endAdornment: (
            <Iconify
              icon="material-symbols:trail-length-medium-outline"
              sx={{ marginLeft: '3px', fontSize: '25px' }}
            />
          ),
        }}
      />

      <RHFTextField
        InputLabelProps={{ shrink: true }}
        name="height"
        label="Chiều cao"
        InputProps={{
          endAdornment: (
            <Iconify
              icon="fluent:arrow-autofit-height-dotted-20-filled"
              sx={{ marginLeft: '3px', fontSize: '25px' }}
            />
          ),
        }}
      />
      <RHFTextField
        InputLabelProps={{ shrink: true }}
        name="weight"
        label="Cân nặng"
        InputProps={{
          endAdornment: (
            <Iconify
              icon="game-icons:weight"
              sx={{ marginLeft: '3px', fontSize: '25px' }}
            />
          ),
        }}
      />
      <RHFSelect name="langVariant" label="Ngôn ngữ" InputLabelProps={{ shrink: true }}>
        <option></option>
        {variantLang.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </RHFSelect>
    </Stack>
  );
}
