import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Container, Paper, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
} from '../../../common/components/hook-form';
import useMessage from '../../../common/hooks/useMessage';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { ISubmitCreateStore } from '../../interfaces';
import { CreateStoreSchema } from '../../schema/createStore.schema';
import { useCreateExternalReferrer } from '../../hooks/useCreateExternalReferrer';

export const CreateStoreForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate, isLoading } = useCreateExternalReferrer();

  const methods = useForm<ISubmitCreateStore>({
    resolver: yupResolver(CreateStoreSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = methods;

  const onSubmit = (data: ISubmitCreateStore) => {
    const dataResult: ISubmitCreateStore = {
      name: data.name,
      code: data.code,
      address: data.address,
      phoneNumber: data.phoneNumber,
      referralCode: data.referralCode,
      status: data?.isActive ? 'ACTIVE' : 'IN_ACTIVE',
    };
    mutate(dataResult);
  };

  return (
    <>
      <Paper elevation={3}>
        <Container sx={{ padding: '25px' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <RHFTextField name="code" label={t('manage_store.code_store')} />

              <RHFTextField name="name" label={t('manage_store.name_store')} />

              <RHFTextField name="address" label={t('manage_store.address_store')} />

              <RHFTextField name="phoneNumber" label={t('manage_store.phone_store')} />

              <RHFTextField name="referralCode" label={t('manage_store.referral_code')} />
              <RHFSwitch name="isActive" label={t('manage_store.status')} />

              <Stack direction="row" spacing={3} justifyContent="flex-end">
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {t('create')}
                </LoadingButton>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    navigate(PATH_DASHBOARD.manageStore.list);
                  }}
                >
                  {t('cancel')}
                </Button>
              </Stack>
            </Stack>
          </FormProvider>
        </Container>
      </Paper>
    </>
  );
};
