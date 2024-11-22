import { InputAdornment, TextField, Grid, Card, MenuItem } from '@mui/material';
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

export default function GroupPolicyToolbar({
  filterName,
  filterStatus,
  filterType,
  onFilterName,
  onFilterStatus,
  onFilterType,
}: Props) {
  const { t } = useTranslation();
  return (
    <Grid container spacing={2} py="30px" ml="10px">
      <Grid item xs={10} md={3}>
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
      </Grid>
      <Grid item xs={10} md={3}>
        <TextField
          fullWidth
          value={filterType}
          onChange={(event) => onFilterType(event.target.value)}
          name="Type"
          label={t('Type')}
          select
        >
          {TYPE_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={10} md={5}>
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
      </Grid>
    </Grid>
  );
}
