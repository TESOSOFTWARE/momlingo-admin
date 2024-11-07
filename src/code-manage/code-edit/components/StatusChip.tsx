import { Chip } from '@mui/material';
import en from '../../../common/locales/en';

export function ActiveChip() {
  return (
    <>
      <Chip
        sx={{
          color: '#229A16',
          backgroundColor: '#E4F8DD',
          fontWeight: 'bold',
          borderRadius: '7px',
        }}
        label={en.active}
      />
    </>
  );
}

export function InActiveChip() {
  return (
    <>
      <Chip
        sx={{
          color: '#B72136',
          backgroundColor: '#FCDFDE',
          fontWeight: 'bold',
          borderRadius: '7px',
        }}
        label={en.inactive}
      />
    </>
  );
}
