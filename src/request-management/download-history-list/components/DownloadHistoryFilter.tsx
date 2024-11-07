import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Container,
  InputAdornment,
  Stack,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider, RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import { dispatch } from 'src/common/redux/store';
import { checkAndConvertDate } from 'src/request-management/request-common/FormatDate';
import vn from 'src/common/locales/vn';
import en from 'src/common/locales/en';
import { ICodeSBPS, IParamsRequest, IProductGroup } from '../../interfaces';
import { DEFAULT_LIMIT_SIZE, DEFAULT_PAGE_SIZE } from '../../constants';
import { useGetListSBPSCode } from '../../hooks/useGetListCodeSBPS';
import i18next from 'i18next';
import { useGetListProductGroup } from '../../hooks/useGetListProductGroup';
import { defaultValueSearch } from '../constants';
import { setSearchForm } from '../slice';
import { ISearchRequest } from '../interface';
import { ListRequestSchema } from '../schema/list-schema';

export default function RequestFilter() {
  const methods = useForm<ISearchRequest>({
    resolver: yupResolver(ListRequestSchema),
    defaultValues: defaultValueSearch,
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = methods;

  const onSubmit = (data: ISearchRequest) => {
    Object.keys(data).map((obj: string) => {
      if (data[obj as keyof ISearchRequest] === '') {
        delete data[obj as keyof ISearchRequest];
      }
    });
    const dataSearch = {
      fileName: data.fileName,
      startDate: checkAndConvertDate(data?.startDate),
      endDate: checkAndConvertDate(data?.endDate),
    };
    dispatch(setSearchForm(dataSearch));
  };
  const handleClickClear = () => {
    reset({
      fileName: defaultValueSearch.fileName,
      startDate: defaultValueSearch.startDate,
      endDate: defaultValueSearch.endDate,
    });
    dispatch(setSearchForm(defaultValueSearch));
  };
  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={2} sx={{ paddingBottom: 3 }}>
          <RHFTextField
            size="small"
            name="fileName"
            placeholder={vn.requestManagement.historyDownload.searchFile}
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
                  label={vn.Request_startDate}
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
                  label={vn.Request_endDate}
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
      </FormProvider>
    </Container>
  );
}
