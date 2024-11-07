import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Container, FormLabel, Paper, Stack, TextField, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from 'src/common/components/hook-form';
import useMessage from 'src/common/hooks/useMessage';
import vn from 'src/common/locales/vn';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import {
  DEFAULT_LIMIT_SIZE,
  DEFAULT_PAGE_SIZE,
  TYPE_REQUEST,
  defaultValuesSBPSCode,
} from '../../constants';
import {
  ICodeSBPS,
  IFormCreateSBPS,
  IParamsRequest,
  IProductGroup,
  IWeight,
} from '../../interfaces';
import { schemaCreateSBPS } from '../../schema';
import { useCreateSBPSCode } from '../../hooks/useCreateSBPS';
import i18n from 'src/common/locales/i18n';
import { useGetListSBPSCode } from '../../hooks/useGetListCodeSBPS';
import { useGetListProductGroup } from '../../hooks/useGetListProductGroup';
import { useGetListWeight } from '../../hooks/useGetListWeight';

export default function FormCreateSBPSCode() {
  const navigate = useNavigate();
  const methods = useForm<IFormCreateSBPS>({
    resolver: yupResolver(schemaCreateSBPS),
    defaultValues: defaultValuesSBPSCode,
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate } = useCreateSBPSCode({
    onSuccess: () => {
      showSuccessSnackbar(i18n.t('requestManagement.notiCreateSuccess'));
      navigate(PATH_DASHBOARD.requestManage.list);
    },
    onError: () => {
      showErrorSnackbar(i18n.t('requestManagement.notiCreateError'));
    },
  });

  const paramsWeight: IParamsRequest = {
    page: DEFAULT_PAGE_SIZE,
    limit: DEFAULT_LIMIT_SIZE,
    productGroup: watch('productGroup'),
    type: TYPE_REQUEST.sbps,
  };
  const paramsProductGroup: IParamsRequest = {
    page: DEFAULT_PAGE_SIZE,
    limit: DEFAULT_LIMIT_SIZE,
    // weight: weightPR,
    type: TYPE_REQUEST.sbps,
  };

  const { data: dataProductGroup } = useGetListProductGroup({
    params: paramsProductGroup,
  });
  const { data: dataWeight } = useGetListWeight({ params: paramsWeight });

  const params: IParamsRequest = {
    page: DEFAULT_PAGE_SIZE,
    limit: DEFAULT_LIMIT_SIZE,
  };
  const { data: dataCodeSBPS } = useGetListSBPSCode({ params: params });

  const onSubmit = (data: IFormCreateSBPS) => {
    const formatDay = new Date(data.useDate);
    const dataNewSBPS = {
      productGroup: data.productGroup,
      weight: data.weight,
      // code: data.code,
      quantity: data.quantity,
      isActive: data.isActive,
      useDate: formatDay.toISOString(),
      type: TYPE_REQUEST.sbps,
    };
    mutate(dataNewSBPS);
  };
  return (
    <Paper elevation={3}>
      <Container sx={{ padding: '30px 0 30px' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={3}>
            <RHFSelect
              name="productGroup"
              label={`${i18n.t('requestManagement.createField.productGroup')}`}
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
            {watch('productGroup') !== '' && (
              <RHFSelect
                name="weight"
                label={`${i18n.t('requestManagement.createField.weight')}`}
              >
                <option value={0} />
                {dataWeight?.items?.map((items: IWeight, key: number) => {
                  return (
                    <option key={key} value={items?.weight}>
                      {items.weight}
                    </option>
                  );
                })}
              </RHFSelect>
            )}
            {/* <RHFSelect
              name="code"
              label={`${i18n.t('requestManagement.createField.code')}`}
            >
              <option value="" />
              {dataCodeSBPS?.items?.map((items: ICodeSBPS, index: number) => {
                return (
                  <option key={index} value={items?.code}>
                    {items?.code}
                  </option>
                );
              })}
            </RHFSelect> */}

            <RHFTextField
              name="quantity"
              placeholder={i18n.t('requestManagement.createField.placeholderQuantity')}
              label={`${i18n.t('requestManagement.createField.quantity')}`}
              InputLabelProps={{ shrink: true }}
              type="number"
            />

            <Controller
              name="useDate"
              control={control}
              render={({ field }) => (
                <Stack position="relative" width="100%">
                  <DateTimePicker
                    {...field}
                    label={`${i18n.t('requestManagement.createField.useDate')}`}
                    inputFormat="MM-dd-yyyy HH:mm:ss"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        helperText={errors.useDate && errors.useDate?.message}
                        error={!!errors.useDate}
                      />
                    )}
                  />
                </Stack>
              )}
            />

            <Stack direction="row" spacing={3}>
              <FormLabel sx={{ height: 'full', display: 'flex', alignItems: 'center' }}>
                {`${i18n.t('requestManagement.createField.status')}`}
              </FormLabel>
              <RHFSwitch
                name="isActive"
                sx={{ width: 'fit-content' }}
                label={undefined}
              />
            </Stack>

            <Stack justifyContent="flex-end" direction="row" spacing={3}>
              <Button
                color="inherit"
                variant="contained"
                onClick={() => navigate(PATH_DASHBOARD.requestManage.list)}
              >
                {`${i18n.t('requestManagement.button.cancel')}`}
              </Button>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {`${i18n.t('requestManagement.button.create')}`}
              </LoadingButton>
            </Stack>
          </Stack>
        </FormProvider>
      </Container>
    </Paper>
  );
}
