import { LoadingButton } from '@mui/lab';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import Iconify from 'src/common/components/Iconify';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import { dispatch } from 'src/common/redux/store';
import { DEFAULT_VALUES_FILTER_DUPLICATE_SCAN } from '../../constants';
import { setSearchDuplicateCode } from '../../historyScan.slice';
import { IParamsDuplicateScan } from '../../interfaces';

type Props = {
  onSetPage: (value: number) => void;
};

export default function DuplicateScanFilterBar({ onSetPage }: Props) {
  const methods = useForm<IParamsDuplicateScan>({
    // resolver: yupResolver(schemaHistoryScan),
    defaultValues: DEFAULT_VALUES_FILTER_DUPLICATE_SCAN,
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
      searchText: data?.searchText,
      // status: data?.status,
      // productGroup: data?.productGroup,
      startDate: data?.startDate,
      endDate: data?.endDate,
      phoneNumber: data?.phoneNumber,
    };
    onSetPage(0);
    dispatch(setSearchDuplicateCode(dataSearch));
  };
  const handleClickClear = () => {
    reset(DEFAULT_VALUES_FILTER_DUPLICATE_SCAN);
    dispatch(setSearchDuplicateCode(DEFAULT_VALUES_FILTER_DUPLICATE_SCAN));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2} sx={{ marginBottom: 3, paddingX: 5 }}>
        <Stack direction="row" spacing={2}>
          <RHFTextField
            size="small"
            name="searchText"
            fullWidth
            placeholder="Nhập mã muỗng..."
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
          <RHFTextField
            size="small"
            name="phoneNumber"
            fullWidth
            placeholder="Nhập số điện thoại..."
          />
        </Stack>

        <Stack direction={{ md: 'row', xs: 'column', sm: 'column' }} spacing={3}>
          <Stack direction={'row'} width={{ md: '50%', sm: '100%' }} spacing={2}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Stack position="relative" width="100%">
                  <DateTimePicker
                    {...field}
                    label={'Từ ngày'}
                    inputFormat="dd/MM/yyyy HH:mm:ss"
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        fullWidth
                        helperText={errors.startDate && errors.startDate?.message}
                        error={!!errors.startDate}
                        type="number"
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
                    label={'Đến ngày'}
                    inputFormat="dd/MM/yyyy HH:mm:ss"
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        fullWidth
                        helperText={errors.endDate && errors.endDate?.message}
                        error={!!errors.endDate}
                        type="number"
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
