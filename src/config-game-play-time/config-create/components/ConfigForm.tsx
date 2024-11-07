import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Button,
  Card,
  Chip,
  CircularProgress,
  Stack,
  TextField,
} from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import useMessage from '../../../common/hooks/useMessage';
import { useDispatch, useSelector } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { IFormCreateConfig, ISearchProductGroup } from '../../common/interface';
import { configPlayTimeSchema } from '../../common/schema';
import { useGetListProductGroup } from '../../common/hooks/useGetListProductGroup';
import { useMutateCreateConfigPlayTime } from '../hooks/useMutateCreateConfig';
import ListBox from '../../../common/components/ListBoxComponent';
import { setSearchProductGroupText } from '../../common/slice';

export default function ConfigPlayTimeForm() {
  const navigate = useNavigate();

  const methods = useForm<IFormCreateConfig>({
    resolver: yupResolver(configPlayTimeSchema),
  });

  const dispatch = useDispatch();
  const { searchProductGroupText } = useSelector(state => state.configPlayTime);

  const searchParams: ISearchProductGroup = {
    page: 1,
    limit: 20,
    isActive: true,
  };
  const { data, fetchNextPage, isLoading, isError, isFetchingNextPage, hasNextPage } =
    useGetListProductGroup(searchParams);

  const listProductGroup = data?.pages?.map((item) => item?.items).flat() || [];

  const handleScroll = (event: any) => {
    const listBoxNode = event?.currentTarget;
    const position = listBoxNode?.scrollTop + listBoxNode?.clientHeight;
    if (listBoxNode.scrollHeight - position <= 1) {
      fetchNextPage();
    }
  };
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = methods;
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { t } = useTranslation();

  const { mutate } = useMutateCreateConfigPlayTime({
    onSuccess: () => {
      showSuccessSnackbar(t('configPlayTime.create.form.create_success'));
      navigate(PATH_DASHBOARD.configPlayTime.list);
    },
    onError: () => {
      showErrorSnackbar(t('configPlayTime.create.form.create_fail'));
    },
  });

  const onSubmit = (data: IFormCreateConfig) => {
    const dataEdit = {
      ...data,
    };
    mutate(dataEdit);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ padding: 2 }}>
        <Stack spacing={3}>
          <RHFTextField size="medium" name="gameId" label={'Game ID'} />
          <Controller
            name="productGroup"
            control={control}
            render={({ fieldState: { error } }) => (
              <Autocomplete
                options={listProductGroup}
                // value={value}
                onChange={(event, newValue) => {
                    if (newValue) {
                        setValue(
                            'productGroup',
                            newValue?.productGroup
                        );
                        setValue(
                            'weight',
                            newValue?.weight
                        );
                    }
                }
                }
                inputValue={searchProductGroupText}
                onInputChange={(event, newInputValue) => {
                  dispatch(setSearchProductGroupText(newInputValue));
                }}
                ListboxComponent={ListBox}
                loading={isFetchingNextPage}
                getOptionLabel={(option) => `${option?.productGroup} - ${option?.weight}`}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('configPlayTime.create.form.productGroup')}
                    placeholder={t('configPlayTime.create.form.productGroup')}
                    error={!!error}
                    helperText={error?.message}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                ListboxProps={{
                  onScroll: handleScroll,
                }}
              />
            )}
          />
          <RHFTextField
            size="medium"
            name="weight"
            disabled
            label={t('configPlayTime.create.form.weight')}
            InputLabelProps={{
                shrink: true,
            }}
          />
          <RHFTextField
            size="medium"
            type="number"
            name="value"
            label={t('configPlayTime.create.form.value')}
          />
        </Stack>
      </Card>
      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          color="inherit"
          size="medium"
          variant="contained"
          onClick={() => navigate(PATH_DASHBOARD.configPlayTime.list)}
        >
          {t('cancel')}
        </Button>
        <LoadingButton
          size="large"
          variant="contained"
          loading={isSubmitting}
          type="submit"
        >
          {t('Save')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
