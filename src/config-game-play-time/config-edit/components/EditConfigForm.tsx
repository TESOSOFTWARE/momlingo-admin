import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import useMessage from '../../../common/hooks/useMessage';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { IFormEditConfig } from '../../common/interface';
import { configPlayTimeSchema } from '../../common/schema';
import { useGetGamePlayTimeConfigById } from '../hooks/useGetConfigById';
import { useMutateEditConfigPlayTime } from '../hooks/useMutateEditConfig';

export default function EditConfigPlayTimeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { useDeepCompareEffect } = useDeepEffect();
  const methods = useForm<IFormEditConfig>({
    resolver: yupResolver(configPlayTimeSchema),
  });

  const { data: dataConfig } = useGetGamePlayTimeConfigById(parseInt(id as string));
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useDeepCompareEffect(() => {
    if (dataConfig) {
      reset({
        id: parseInt(id as string),
        gameId: dataConfig?.game?.id,
        productGroup: dataConfig?.productGroup,
        weight: dataConfig?.weight,
        value: dataConfig?.value,
      });
    }
  }, [dataConfig]);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { t } = useTranslation();

  const { mutate } = useMutateEditConfigPlayTime({
    onSuccess: () => {
      showSuccessSnackbar(t('configPlayTime.create.form.edit_success'));
      navigate(PATH_DASHBOARD.configPlayTime.list);
    },
    onError: () => {
      showErrorSnackbar(t('configPlayTime.create.form.edit_fail'));
    },
  });

  const onSubmit = (data: IFormEditConfig) => {
    const dataEdit = {
      ...data,
    };
    mutate(dataEdit);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ padding: 2 }}>
        <Stack spacing={3}>
          <RHFTextField
            size="medium"
            name="gameId"
            label={'Game ID'}
            disabled
            InputLabelProps={{ shrink: true }}
          />
          <RHFTextField
            size="medium"
            name="productGroup"
            label={t('configPlayTime.create.form.productGroup')}
            disabled
            InputLabelProps={{ shrink: true }}
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
            name="value"
            label={t('configPlayTime.create.form.value')}
            InputLabelProps={{
              shrink: true,
            }}
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
