import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import vn from '../../../common/locales/vn';

export function ActiveChip() {
  const { t } = useTranslation();
  return (
    <>
      <Chip
        sx={{
          color: '#004d40',
          backgroundColor: '#eeeeee',
          fontWeight: 'bold',
          borderRadius: '7px',
        }}
        label={t('attribute.list.yes')}
      />
    </>
  );
}

export function BannedChip() {
  const { t } = useTranslation();
  return (
    <>
      <Chip
        sx={{
          color: '#b71c1c',
          backgroundColor: '#fbe9e7',
          fontWeight: 'bold',
          borderRadius: '7px',
        }}
        label={t('attribute.list.no')}
      />
    </>
  );
}
