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
import { ISearchUser } from '../../../interfaces';
import { ListUserSchema } from '../../../schema';
import { DEFAULT_VALUE_SEARCH_USER, USER_STATUS, UserStatus } from '../../../constants';
import { searchFormSelector, setSearchForm } from '../../../userManage.slice';
import { UserRank } from '../../constants';
import { setDataCheckAllUsers } from '../../groupUser.slices';

export default function PickUserFilterBar() {
  const methods = useForm<ISearchUser>({
    resolver: yupResolver(ListUserSchema),
    defaultValues: DEFAULT_VALUE_SEARCH_USER,
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
  const onSubmit = (data: ISearchUser) => {
    const dataSearch = {
      name: data.name,
      tierCode: data.tierCode,
      email: data.email,
      phoneNumber: data.phoneNumber,
      accountStatus: data.accountStatus,
    };
    dispatch(setSearchForm(dataSearch));
    dispatch(setDataCheckAllUsers(dataSearch));
  };
  const handleClickClear = () => {
    reset(DEFAULT_VALUE_SEARCH_USER);
    dispatch(setSearchForm(DEFAULT_VALUE_SEARCH_USER));
    dispatch(setDataCheckAllUsers(DEFAULT_VALUE_SEARCH_USER));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2} sx={{ marginBottom: 3, paddingX: 5 }}>
        <Stack direction="row" spacing={3}>
          <RHFTextField
            size="small"
            name="name"
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
          <RHFTextField size="small" name="email" label="Email" />
        </Stack>
        <Stack direction={{ md: 'row', xs: 'column', sm: 'column' }} spacing={3}>
          <RHFTextField
            sx={{ width: { xs: '100%', sm: '100%', md: '50%' } }}
            size="small"
            name="phoneNumber"
            label="Số điện thoại"
          />
          <Stack direction={'row'} width={{ md: '50%', sm: '100%' }} spacing={2}>
            <RHFSelect
              name="tierCode"
              label={`${i18next.t('userManage.rank')}`}
              size="small"
              //   SelectProps={{ native: false }}
            >
              <option value="" />
              {Object.values(UserRank).map((valueRank) => (
                <option key={valueRank} value={valueRank}>
                  {valueRank}
                </option>
              ))}
            </RHFSelect>
            <RHFSelect
              name="accountStatus"
              size="small"
              label={'Trạng thái'}
              //   SelectProps={{ native: false }}
            >
              <option value="" />
              {USER_STATUS.map((valueStatus) => (
                <option key={valueStatus.value} value={valueStatus?.value}>
                  {valueStatus.name}
                </option>
              ))}
            </RHFSelect>
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
