import { Stack, TextField, MenuItem, InputAdornment } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import Iconify from 'src/common/components/Iconify';
import { dispatch, useSelector } from '../../../common/redux/store';
import { setSearchText, setSearchType } from '../../common/gift.slice';

type Props = {
  setPage: Dispatch<SetStateAction<number>>;
};

export default function TableToolbar({ setPage }: Props) {
  const { searchText, searchType } = useSelector((state) => state.gift);
  const { t } = useTranslation();

  return (
    <>
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ p: 3 }}>
        <TextField
          fullWidth
          select
          label="Filter"
          value={searchType}
          onChange={(event) => {
            dispatch(setSearchType(event.target.value));
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
          <MenuItem
            value={'ID'}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            ID
          </MenuItem>
          <MenuItem
            value={'GIFT_NAME'}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {t('giftName')}
          </MenuItem>
        </TextField>

        <TextField
          fullWidth
          placeholder="Search..."
          value={searchText}
          onChange={(event) => {
            dispatch(setSearchText(event.target.value));
            setPage(0);
          }}
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
