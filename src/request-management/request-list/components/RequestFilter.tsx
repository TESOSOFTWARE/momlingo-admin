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
import {
  defaultValueSearch,
  filterOptions,
  filterOptionsStatus,
} from '../../../request-management/request-list/list-constants';
import { ISearchRequest } from '../../../request-management/request-list/list-interface';
import { setSearchForm } from '../../../request-management/request-list/list-slice';
import { ListRequestSchema } from '../schema/list-schema';
import vn from 'src/common/locales/vn';
import en from 'src/common/locales/en';
import { ICodeSBPS, IParamsRequest, IProductGroup } from '../../interfaces';
import { DEFAULT_LIMIT_SIZE, DEFAULT_PAGE_SIZE } from '../../constants';
import { useGetListSBPSCode } from '../../hooks/useGetListCodeSBPS';
import { useGetListProductGroup } from '../../hooks/useGetListProductGroup';
import i18n from 'src/common/locales/i18n';
import { useTranslation } from 'react-i18next';

type Props = {
  onSetPage: (value: number) => void;
};

export default function RequestFilter({ onSetPage }: Props) {
  const { t } = useTranslation();
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
      name: data.name,
      startDate: checkAndConvertDate(data.startDate),
      endDate: checkAndConvertDate(data.endDate),
      type: data.type,
      productGroup: data.productGroup,
      status: data.status,
      code: data.code,
    };
    onSetPage(0);
    dispatch(setSearchForm(dataSearch));
  };
  const handleClickClear = () => {
    reset({
      name: '',
      startDate: defaultValueSearch.startDate,
      endDate: defaultValueSearch.endDate,
      type: '',
      productGroup: '',
      status: '',
      code: '',
    });
    dispatch(setSearchForm(defaultValueSearch));
  };
  const paramsProductGroup: IParamsRequest = {
    page: DEFAULT_PAGE_SIZE,
    limit: DEFAULT_LIMIT_SIZE,
    type: watch('type') || '',
  };

  const { data: dataProductGroup } = useGetListProductGroup({
    params: paramsProductGroup,
  });
  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} sx={{ paddingBottom: 3 }}>
          <Stack direction="row" spacing={2} sx={{ paddingBottom: 3 }}>
            <RHFTextField size="small" name="code" label="Mã muỗng" />

            <RHFTextField
              size="small"
              name="name"
              placeholder={vn.Request_searchText}
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
          </Stack>
          <Stack direction="row" spacing={2} sx={{ paddingBottom: 3 }}>
            <RHFSelect name="type" size="small" label={vn.Type}>
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </RHFSelect>
            <RHFSelect name="status" size="small" label={vn.status}>
              {filterOptionsStatus.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </RHFSelect>
            {watch('type') && (
              <RHFSelect
                name="productGroup"
                label={t('requestManagement.createField.productGroup')}
                size="small"
              >
                <option value="" />
                {dataProductGroup?.items?.map((items: IProductGroup, index: number) => {
                  return (
                    <option key={index} value={items?.productGroup}>
                      {items?.productGroup}
                    </option>
                  );
                })}
              </RHFSelect>
            )}
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
