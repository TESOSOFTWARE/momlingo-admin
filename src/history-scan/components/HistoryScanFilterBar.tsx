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
import { schemaHistoryScan } from '../schema';
import { IListHistoryScanParams } from '../interfaces';
import {
  DEFAULT_VALUES_FILTER_HISTORY_SCAN,
  StatusHistoryScan,
  filterOptions,
} from '../constants';
import { useGetListProductGroup } from '../../request-management/hooks/useGetListProductGroup';
import { IProductGroup } from '../../request-management/interfaces';
import { setSearchForm } from '../historyScan.slice';
import vn from '../../common/locales/vn';

type Props = {
  searchUserId?: number;
  onSetPage: (value: number) => void;
};

export default function HistoryScanFilterBar({ searchUserId, onSetPage }: Props) {
  const methods = useForm<IListHistoryScanParams>({
    resolver: yupResolver(schemaHistoryScan),
    defaultValues: DEFAULT_VALUES_FILTER_HISTORY_SCAN,
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
      userId: searchUserId,
      code: data?.code,
      status: data?.status,
      productGroup: data?.productGroup,
      startDate: data?.startDate,
      endDate: data?.endDate,
    };
    onSetPage(0);
    dispatch(setSearchForm(dataSearch));
  };
  const handleClickClear = () => {
    reset({ ...DEFAULT_VALUES_FILTER_HISTORY_SCAN, userId: searchUserId });
    dispatch(
      setSearchForm({ ...DEFAULT_VALUES_FILTER_HISTORY_SCAN, userId: searchUserId })
    );
  };

  const { data: dataProductGroup } = useGetListProductGroup({
    params: {
      page: undefined,
      limit: undefined,
      type: watch('type'),
    },
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2} sx={{ marginBottom: 3, paddingX: 5 }}>
        <RHFTextField
          size="small"
          name="code"
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

        <Stack direction={{ md: 'row', xs: 'column', sm: 'column' }} spacing={3}>
          <Stack direction={'row'} width={{ md: '100%', sm: '100%' }} spacing={2}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Stack position="relative" width="100%">
                  <DateTimePicker
                    {...field}
                    label={'Từ ngày'}
                    inputFormat="MM/dd/yyyy HH:mm:ss"
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
                    inputFormat="MM/dd/yyyy HH:mm:ss"
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
            <RHFSelect
              name="status"
              size="small"
              label="Trạng thái"
              SelectProps={{ native: false }}
            >
              <MenuItem value="" disabled></MenuItem>
              {Object.values(StatusHistoryScan).map((item, index: number) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </RHFSelect>
          </Stack>
        </Stack>
        <Stack direction={'row'} width={{ md: '100%', sm: '100%' }} spacing={2}>
          <RHFSelect name="type" size="small" label={vn.Type}>
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </RHFSelect>
          <RHFSelect
            name="productGroup"
            size="small"
            SelectProps={{ native: false }}
            label="Sản phẩm"
          >
            <MenuItem value="" disabled />
            {dataProductGroup?.items?.map((items: IProductGroup, index: number) => {
              return (
                <MenuItem key={index} value={items?.productGroup}>
                  {items?.productGroup}
                </MenuItem>
              );
            })}
          </RHFSelect>
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
