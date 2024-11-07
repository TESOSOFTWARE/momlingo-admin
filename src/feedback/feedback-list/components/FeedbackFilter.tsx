import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Container, Stack, Button, InputAdornment, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider, RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import { dispatch, useSelector } from 'src/common/redux/store';
import {
  defaultValueSearch,
  filterOptionsStatus,
} from '../../../request-management/request-list/list-constants';
import vn from 'src/common/locales/vn';
import { useTranslation } from 'react-i18next';
import { setSearchParams } from '../../slice';
import { DateTimePicker } from '@mui/x-date-pickers';
import { IFilterForm } from '../../interface';
import { typeFeedback } from '../../constants';

type Props = {
  onSetPage: (value: number) => void;
};

export default function FeedbackFilter({ onSetPage }: Props) {
  const { t } = useTranslation();
  const methods = useForm<IFilterForm>({
    defaultValues: {
      phone: '',
      name: '',
      startDate: '',
      endDate: '',
      type: '',
    },
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = methods;

  const onSubmit = (data: IFilterForm) => {
    Object.keys(data).map((obj: string) => {
      if (data[obj as keyof IFilterForm] === '') {
        delete data[obj as keyof IFilterForm];
      }
    });
    onSetPage(0);
    dispatch(setSearchParams(data));
  };
  const handleClickClear = () => {
    reset({
      phone: '',
      name: '',
      startDate: '',
      endDate: '',
      type: '',
    });
    dispatch(
      setSearchParams({
        phone: undefined,
        name: undefined,
        startDate: undefined,
        endDate: undefined,
        type: undefined,
      })
    );
  };
  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} sx={{ paddingBottom: 3 }}>
          <Stack direction="row" spacing={1}>
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
              placeholder="Tìm kiếm theo tên"
            />
            <RHFTextField size="small" name="phone" label="Số điện thoại" />

            <RHFSelect name="type" size="small" label={vn.status}>
              {typeFeedback.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </RHFSelect>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Controller
              name="startDate"
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
                    label={vn.Request_endDate}
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
            <LoadingButton
              size="small"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ minWidth: '100px!important' }}
              startIcon={<Iconify icon="material-symbols:filter-alt" />}
            >
              {vn.filter}
            </LoadingButton>
            <Button
              size="small"
              color="inherit"
              sx={{ minWidth: '100px!important' }}
              variant="contained"
              onClick={handleClickClear}
              startIcon={<Iconify icon="ph:x-bold" />}
            >
              {vn.cancel}
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Container>
  );
}
