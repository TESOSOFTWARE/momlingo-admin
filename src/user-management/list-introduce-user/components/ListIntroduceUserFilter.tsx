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
import { ISearchUser, ISearchUserIntroduced } from '../../interfaces';
import { ListUserSchema } from '../../schema';
import { DEFAULT_VALUE_SEARCH_INTRODUCE } from '../../constants';
import {
  searchFormSelector,
  setSearchForm,
  setSearchFormIntroduce,
} from '../../userManage.slice';
import { useSelector } from 'react-redux';
import vn from '../../../common/locales/vn';

type Props = {
  onSetPage: (value: number) => void;
};

export default function UserFilterBar({ onSetPage }: Props) {
  const methods = useForm<ISearchUserIntroduced>({
    defaultValues: DEFAULT_VALUE_SEARCH_INTRODUCE,
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

  const searchForm = useSelector(searchFormSelector);
  const onSubmit = (data: ISearchUserIntroduced) => {
    const dataSearch = {
      referrerName: data.referrerName,
      phoneNumber: data.phoneNumber,
      minReferralDate: data.minReferralDate,
      maxReferralDate: data.maxReferralDate,
    };
    onSetPage(0);
    dispatch(setSearchFormIntroduce(dataSearch));
  };
  const handleClickClear = () => {
    reset(DEFAULT_VALUE_SEARCH_INTRODUCE);
    dispatch(setSearchFormIntroduce(DEFAULT_VALUE_SEARCH_INTRODUCE));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2} sx={{ paddingX: 3 }}>
        <Stack direction="row" spacing={3}>
          <RHFTextField
            size="small"
            name="referrerName"
            placeholder="Người giới thiệu"
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
            label="Số điện thoại người giới thiệu"
          />
        </Stack>
        <Stack direction={{ md: 'row', xs: 'column', sm: 'column' }} spacing={3}>
          <Controller
            name="minReferralDate"
            control={control}
            render={({ field }) => (
              <Stack position="relative" width="100%">
                <DateTimePicker
                  {...field}
                  label={vn.Request_startDate}
                  inputFormat="dd/MM/yyyy HH:mm:ss"
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      fullWidth
                      helperText={
                        errors.minReferralDate && errors.minReferralDate?.message
                      }
                      error={!!errors.minReferralDate}
                      type="number"
                    />
                  )}
                />
              </Stack>
            )}
          />

          <Controller
            name="maxReferralDate"
            control={control}
            render={({ field }) => (
              <Stack position="relative" width="100%">
                <DateTimePicker
                  {...field}
                  label={vn.Request_endDate}
                  inputFormat="dd/MM/yyyy HH:mm:ss"
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      fullWidth
                      helperText={
                        errors.maxReferralDate && errors.maxReferralDate?.message
                      }
                      error={!!errors.maxReferralDate}
                      type="number"
                    />
                  )}
                />
              </Stack>
            )}
          />
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
      <Stack direction={'row'} spacing={2} sx={{ minHeight: '40px' }}></Stack>
    </FormProvider>
  );
}
