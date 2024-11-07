import { Stack, TextField, InputAdornment, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Iconify from 'src/common/components/Iconify';
import { filterOptions } from 'src/winning-history/constants';
import { dispatch, useSelector } from 'src/common/redux/store';
import { setFilterOption, setTextSearch } from 'src/winning-history/history.slice';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setPage: Dispatch<SetStateAction<number>>;
};

export default function HistoryToolbar({ setPage }: Props) {
  const { t } = useTranslation();
  const { textSearch, filterOption } = useSelector((state) => state.historyWinning);

  return (
    <>
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 3, px: 3 }}>
        <TextField
          fullWidth
          select
          label="Filter"
          value={filterOption}
          onChange={(event) => {
            dispatch(setFilterOption(event.target.value));
            setPage(0);
          }}
          SelectProps={{
            MenuProps: {
              sx: { '& .MuiPaper-root': { maxHeight: 260 } },
            },
          }}
          sx={{
            maxWidth: { sm: 240 },
            textTransform: 'capitalize',
          }}
        >
          {filterOptions.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 0.75,
                typography: 'body2',
                textTransform: 'capitalize',
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          placeholder="Search..."
          value={textSearch}
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
          onChange={(event) => {
            dispatch(setTextSearch(event.target.value));
            setPage(0);
          }}
        />
      </Stack>
    </>
  );
}
