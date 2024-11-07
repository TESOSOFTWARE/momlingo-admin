import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Container,
  InputAdornment,
  Stack,
  TextField,
  Button,
  MenuItem,
  Box,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider, RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import { dispatch } from 'src/common/redux/store';
import i18next from 'i18next';

import { useSelector } from 'react-redux';
import { ISearchRefundedOrder } from '../interfaces';
import { DEFAULT_VALUE_SEARCH_REFUNDED_ORDER, TYPE_REFUND } from '../constants';
import { setDataSearch } from '../refunded.slice';

type Props = {
  onSetPage: (value: number) => void;
};

export default function RefundedOrderFilterBar({ onSetPage }: Props) {
  const methods = useForm<ISearchRefundedOrder>({
    defaultValues: DEFAULT_VALUE_SEARCH_REFUNDED_ORDER,
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
    watch,
    resetField,
    setFocus,
  } = methods;

  const onSubmit = (data: any) => {
    const dataSearch = {
      name: data?.name,
      orderId: data?.orderId,
      startDate: data?.startDate,
      endDate: data?.endDate,
      type: data?.type,
    };
    onSetPage(0);
    dispatch(setDataSearch(dataSearch));
  };
  const handleClickClear = () => {
    reset(DEFAULT_VALUE_SEARCH_REFUNDED_ORDER);
    dispatch(setDataSearch(DEFAULT_VALUE_SEARCH_REFUNDED_ORDER));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2} sx={{ marginBottom: 3, paddingX: 5 }}>
        <Stack direction="row" spacing={3}>
          <RHFSelect
            name="type"
            label="Loại sản phẩm"
            size="small"
            style={{ width: '30%' }}
            InputLabelProps={{ shrink: true }}
          >
            {TYPE_REFUND.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </RHFSelect>
          <RHFTextField
            size="small"
            name="orderId"
            placeholder="Nhập mã đơn hàng"
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
        <Stack direction={{ md: 'row', xs: 'column', sm: 'column' }} spacing={3}>
          <RHFTextField
            size="small"
            name="name"
            label="Tên khách hàng"
            sx={{ width: '50%' }}
          />
          <Stack direction={'row'} width={'50%'} spacing={2}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Stack position="relative" width="100%">
                  <DateTimePicker
                    {...field}
                    label={'Ngày bắt đầu'}
                    inputFormat="dd-MM-yyyy hh:mm:ss"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        helperText={errors.startDate && errors.startDate?.message}
                        error={!!errors.startDate}
                        size="small"
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
                    label={'Ngày kết thúc'}
                    inputFormat="dd-MM-yyyy hh:mm:ss"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        helperText={errors.endDate && errors.endDate?.message}
                        error={!!errors.endDate}
                        size="small"
                      />
                    )}
                  />
                </Stack>
              )}
            />
          </Stack>
        </Stack>
        <Stack direction={'row'} spacing={2} sx={{ minHeight: '40px' }}>
          <LoadingButton
            size="small"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ minWidth: '120px!important' }}
            startIcon={<Iconify icon="ic:outline-search" />}
          >
            Tìm kiếm
          </LoadingButton>
          <Button
            size="small"
            color="inherit"
            sx={{ minWidth: '100px!important' }}
            variant="contained"
            onClick={handleClickClear}
            startIcon={<Iconify icon="ph:x-bold" />}
          >
            Hủy
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
