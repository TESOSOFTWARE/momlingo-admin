import { InputAdornment, Stack, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import Iconify from 'src/common/components/Iconify';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ClearIcon from '@mui/icons-material/Clear';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { dispatch } from 'src/common/redux/store';
import { setEndDate, setStartDate, setTextSearch } from '../qrCode.slice';

import { Dispatch, SetStateAction } from 'react';
import { IParamsSearch } from '../../interfaces';
import { DEFAULT_VALUE_FILTER_QR_CODE } from '../../constants';

type Props = {
  setPage: Dispatch<SetStateAction<number>>;
};

export default function TableToolbar({ setPage }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IParamsSearch>({
    defaultValues: DEFAULT_VALUE_FILTER_QR_CODE,
  });

  const onSubmit = (data: IParamsSearch) => {
    dispatch(setTextSearch(data.textSearch));
    dispatch(setStartDate(data.startDate));
    dispatch(setEndDate(data.endDate));
    setPage(0);
  };

  const onClearFilter = () => {
    reset({
      textSearch: '',
      startDate: null,
      endDate: null,
    });

    dispatch(setTextSearch(''));
    dispatch(setStartDate(null));
    dispatch(setEndDate(null));
    setPage(0);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ padding: 3 }}>
          <TextField
            fullWidth
            label=""
            size="small"
            placeholder="Nhập từ khóa tìm kiếm"
            {...register('textSearch')}
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
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <Stack position="relative" width="100%">
                <DateTimePicker
                  {...field}
                  label={'Ngày bắt đầu'}
                  inputFormat="MM-dd-yyyy HH:mm:ss"
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      {...register('startDate')}
                      fullWidth
                      helperText={errors.startDate && errors.startDate?.message}
                      error={!!errors.startDate}
                    />
                  )}
                />
              </Stack>
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <Stack position="relative" width="100%">
                <DateTimePicker
                  {...field}
                  label={'Ngày kết thúc'}
                  inputFormat="MM-dd-yyyy HH:mm:ss"
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      fullWidth
                      {...register('endDate')}
                      helperText={errors.endDate && errors.endDate?.message}
                      error={!!errors.endDate}
                    />
                  )}
                />
              </Stack>
            )}
          />
          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ width: '70%' }}
          >
            <Button
              sx={{
                width: '100%',
              }}
              variant="contained"
              startIcon={<FilterAltIcon />}
              type="submit"
              size="small"
            >
              Filter
            </Button>
            <Button
              sx={{
                width: '100%',
              }}
              variant="contained"
              color="inherit"
              startIcon={<ClearIcon />}
              onClick={onClearFilter}
              size="small"
            >
              Clear
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
}
