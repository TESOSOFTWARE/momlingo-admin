import { Grid, InputAdornment, TextField } from '@mui/material';
// components
import Iconify from 'src/common/components/Iconify';
// ----------------------------------------------------------------------

type Props = {
  filterName: string;
  onFilterName: (value: string) => void;
  filterGameId?: number;
  onFilterGameId: (value: number) => void;
};

export default function ConfigPlayTimeToolbar({
  filterName,
  filterGameId,
  onFilterName,
  onFilterGameId,
}: Props) {
  return (
      <Grid container spacing={2} py="30px" ml="10px">
        <Grid item xs={10} md={5.5}>
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
        <Grid item xs={10} md={5.5}>
          <TextField
            fullWidth
            value={filterGameId}
            onChange={(event) => onFilterGameId(parseInt(event.target.value))}
            placeholder="Search game..."
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
