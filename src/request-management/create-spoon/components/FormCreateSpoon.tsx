import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Container, FormLabel, Paper, Stack, TextField } from '@mui/material';
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
import i18n from 'src/common/locales/i18n';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  DEFAULT_LIMIT_SIZE,
  DEFAULT_PAGE_SIZE,
  SpoonType,
  TYPE_REQUEST,
  defaultValuesSpoonCode,
} from '../../constants';
import { useCreateSpoonCode } from '../../hooks/useCreateSpoon';
import { useGetListProductGroup } from '../../hooks/useGetListProductGroup';
import { useGetListWeight } from '../../hooks/useGetListWeight';
import {
  IFormCreateSpoon,
  IParamsRequest,
  IProductGroup,
  IWeight,
} from '../../interfaces';
import {
  productGroupParamsSelector,
  quantitySpoonSelector,
  setProductGroupParams,
  setQuantitySpoon,
  weightParamsSelector,
} from '../../requestManage.slice';
import { schemaCreateSpoon } from '../../schema';
import { useEffect, useState } from 'react';

export default function FormCreateSpoonCode() {
  const navigate = useNavigate();
  const methods = useForm<IFormCreateSpoon>({
    resolver: yupResolver(schemaCreateSpoon),
    defaultValues: defaultValuesSpoonCode,
  });
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProductGroupParams(''));
  }, []);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate } = useCreateSpoonCode({
    onSuccess: () => {
      showSuccessSnackbar(t('requestManagement.notiCreateSuccess'));
      dispatch(setQuantitySpoon(''));
      navigate(PATH_DASHBOARD.requestManage.list);
    },
    onError: () => {
      showErrorSnackbar(t('requestManagement.notiCreateError'));
    },
  });

  const weightPR = useSelector(weightParamsSelector);
  const productGroupPR = useSelector(productGroupParamsSelector);
  const quantitySpoon = useSelector(quantitySpoonSelector);

  const paramsWeight: IParamsRequest = {
    page: DEFAULT_PAGE_SIZE,
    limit: DEFAULT_LIMIT_SIZE,
    productGroup: watch('productGroup'),
    type: TYPE_REQUEST.spoon,
  };
  const paramsProductGroup: IParamsRequest = {
    page: DEFAULT_PAGE_SIZE,
    limit: DEFAULT_LIMIT_SIZE,
    type: TYPE_REQUEST.spoon,

    // weight: weightPR,
  };

  const { data: dataProductGroup } = useGetListProductGroup({
    params: paramsProductGroup,
  });
  const { data: dataWeight } = useGetListWeight({ params: paramsWeight });

  const onSubmit = (data: IFormCreateSpoon) => {
    const formatDay = new Date(data.useDate);

    const arrQuantity = quantitySpoon.split(',');
    let quantityPostForm = '';
    arrQuantity.forEach((a: string) => {
      quantityPostForm = quantityPostForm + a;
    });
    const dataNewSpoon = {
      productGroup: data.productGroup,
      weight: data.weight,
      quantity: parseInt(quantityPostForm),
      useDate: formatDay.toISOString(),
      type: TYPE_REQUEST.spoon,
      spoonType: data.spoonType,
    };
    mutate(dataNewSpoon);
  };

  const formatQuantity = (quantity: any) => {
    if (parseInt(quantity) === 0) return '0';
    return quantity
      ?.toString()
      .replace(/[^0-9]/g, '')
      .replace(/^0+/, '')
      .replace(/\d(?=(\d{3})+$)/g, '$&,');
  };

  useEffect(() => {
    dispatch(setQuantitySpoon(watch('quantity')));
  }, [watch('quantity')]);

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
            <RHFSelect
              name="spoonType"
              label={`${i18n.t('requestManagement.createField.spoonType')}`}
            >
              <option value={''} />
              {Object.values(SpoonType)?.map((itemType) => (
                <option key={itemType} value={itemType}>
                  {itemType}
                </option>
              ))}
            </RHFSelect>

            <RHFTextField
              name="quantity"
              label={`${i18n.t('requestManagement.createField.quantity')}`}
              value={formatQuantity(quantitySpoon)}
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
