import { InputAdornment, TextField, Grid, Card, MenuItem, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
// components
import Iconify from 'src/common/components/Iconify';
import { STATUS_OPTIONS, TYPE_OPTIONS } from '../../common/constant';
// ----------------------------------------------------------------------

type Props = {
  filterName: string;
  onFilterName: (value: string) => void;
  filterStatus: string;
  onFilterStatus: (value: string) => void;
  filterType: string;
  onFilterType: (value: string) => void;
};

export default function TermPolicyToolbar({
  filterName,
  filterStatus,
  filterType,
  onFilterName,
  onFilterStatus,
  onFilterType,
}: Props) {
  const { t } = useTranslation();
  return (
    <>
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ p: 3 }}>
        <TextField
          fullWidth
          value={filterStatus}
          onChange={(event) => onFilterStatus(event.target.value)}
          name="status"
          label={t('status')}
          select
        >
          {STATUS_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder="Search name..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={'eva:search-fill'}
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </>
  );
}
