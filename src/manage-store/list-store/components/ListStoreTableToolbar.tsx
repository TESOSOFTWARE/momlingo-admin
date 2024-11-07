import { Button, Container, InputAdornment, Stack, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Controller, useForm } from 'react-hook-form';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import { typeSearch } from '../../constant';
import { ICustomParams, IFormFilter } from '../../interfaces';
import { dispatch } from '../../../common/redux/store';
import { setFilterListParams } from '../../manageStore.slice';

type Props = {
  onSetPage: (value: number) => void;
};

export const ListStoreTableToolbar = ({ onSetPage }: Props) => {
  const methods = useForm<ICustomParams>({
    defaultValues: {
      from: null,
      to: null,
      name: '',
      phoneNumber: '',
    },
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;
  const onSubmit = (data: ICustomParams) => {
    onSetPage(0);
    dispatch(setFilterListParams(data));
  };

  const onReset = () => {
    reset();
    dispatch(
      setFilterListParams({
        from: null,
        to: null,
        name: '',
        phoneNumber: '',
      })
    );
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={'column'} spacing={3} padding={5}>
          <Stack direction="row" spacing={3}>
            <RHFTextField
              sx={{ display: 'flex', flexGrow: '1' }}
              fullWidth
              name="name"
              label={'Tìm kiếm theo cửa hàng'}
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
              sx={{ display: 'flex', flexGrow: '1' }}
              fullWidth
              name="phoneNumber"
              label={'Tìm kiếm số điện thoại'}
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
          <Stack
            direction="row"
            spacing={3}
            style={{ width: '100%', justifyContent: 'space-between' }}
          >
            <Stack direction="row" spacing={3} width={'85%'}>
              <Controller
                name="from"
                defaultValue={''}
                control={control}
                render={({ field }) => (
                  <Stack position="relative" width="100%">
                    <DateTimePicker
                      {...field}
                      label={'Ngày bắt đầu'}
                      inputFormat="dd-MM-yyyy hh:mm a"
                      renderInput={(params) => (
                        <TextField {...params} fullWidth error={false} />
                      )}
                    />
                  </Stack>
                )}
              />
              <Controller
                name="to"
                control={control}
                defaultValue={''}
                render={({ field }) => (
                  <Stack position="relative" width="100%">
                    <DateTimePicker
                      {...field}
                      label={'Ngày kết thúc'}
                      inputFormat="dd-MM-yyyy hh:mm a"
                      renderInput={(params) => (
                        <TextField {...params} fullWidth error={false} />
                      )}
                    />
                  </Stack>
                )}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={3}
              width="20%"
              justifyContent={'space-between'}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ flex: 1 }}
              >
                Tìm kiếm
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={onReset}
                style={{ flex: 1 }}
              >
                Đặt lại
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </FormProvider>
    </>
  );
};
