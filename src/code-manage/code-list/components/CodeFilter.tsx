import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Container, InputAdornment, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Controller, useForm } from 'react-hook-form';
import { FormProvider, RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import en from '../../../common/locales/en';
import { dispatch } from '../../../common/redux/store';
import { setSearchForm } from '../../code-common/code.slice';
import { statusCode } from '../../code-common/constants';
import { checkAndConvertDate } from '../../code-common/utils/checkAndConvertDate';
import {
  defaulValuesSearchCode,
  defaulValuesTypeSeacrch,
  Search_Type,
} from '../list.constants';
import { ISearchForm } from '../list.interface';
import { CodeListSchema } from '../schema/list.schema';

export default function CodeFilter() {
  const methods = useForm<ISearchForm>({
    resolver: yupResolver(CodeListSchema),
    defaultValues: defaulValuesSearchCode,
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = (data: ISearchForm) => {
    const dataStartDate = checkAndConvertDate(data.startDate);
    const dataEndDate = checkAndConvertDate(data.endDate);

    const checkValuesLabel = (data: string | undefined) => {
      if (data === defaulValuesTypeSeacrch.searchType) {
        return (data = undefined);
      } else {
        return data;
      }
    };

    const searchData = {
      searchText: data.searchText,
      searchType: checkValuesLabel(data.searchType),
      startDate: dataStartDate,
      endDate: dataEndDate,
      status: checkValuesLabel(data.status),
    };
    dispatch(setSearchForm(searchData));
  };

  const handleClickClear = () => {
    reset({
      searchText: defaulValuesTypeSeacrch.searchText,
      searchType: defaulValuesTypeSeacrch.searchType,
      startDate: defaulValuesTypeSeacrch.startDate,
      endDate: defaulValuesTypeSeacrch.endDate,
      status: defaulValuesTypeSeacrch.status,
    });
  };

  return (
    <Container sx={{ padding: '10px' }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={3} sx={{ margin: '15px' }}>
          <RHFTextField
            sx={{ display: 'flex', flexGrow: '1' }}
            fullWidth
            name="searchText"
            placeholder={en.inputText}
            label={en.search}
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
          <RHFSelect name="searchType" label={en.searchType}>
            {Search_Type.map((items) => {
              return (
                <option value={items.value} key={items.value}>
                  {items.label}
                </option>
              );
            })}
          </RHFSelect>
          <Stack direction="row" spacing={3}>
            <LoadingButton variant="contained" size="large" type="submit">
              {en.filter}
            </LoadingButton>
            <Button
              variant="contained"
              color="inherit"
              size="large"
              onClick={handleClickClear}
            >
              {en.clear}
            </Button>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
          margin="15px"
        >
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <Stack position="relative" width="100%">
                <DateTimePicker
                  {...field}
                  label={en.startDate}
                  inputFormat="dd/MM/yyyy hh:mm:ss"
                  renderInput={(params) => (
                    <TextField
                      {...params}
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
                  label={en.endDate}
                  inputFormat="dd/MM/yyyy hh:mm:ss"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      helperText={errors.endDate && errors.endDate?.message}
                      error={!!errors.endDate}
                    />
                  )}
                />
              </Stack>
            )}
          />

          <RHFSelect name="status" label={en.status} sx={{ maxWidth: '300px' }}>
            <option key={1}>ALL</option>
            {statusCode.map((option) => (
              <option key={option} value={option}>
                {option === 'ACTIVE' ? `${en.active}` : `${en.inactive}`}
              </option>
            ))}
          </RHFSelect>
        </Stack>
      </FormProvider>
    </Container>
  );
}
