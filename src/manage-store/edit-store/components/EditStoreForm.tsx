import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Container,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  Switch,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
} from '../../../common/components/hook-form';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { ISubmitCreateStore } from '../../interfaces';
import { CreateStoreSchema } from '../../schema/createStore.schema';
import { useEditExternalReferrer } from '../../hooks/useEditExternalReferrer';
import { useGetExternalReferrerById } from '../../hooks/useGetExternalReferrerById';
import { useEffect } from 'react';
import { useSelector } from '../../../common/redux/store';

export const EditStoreForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const { modeAction } = useSelector((state) => state.manageStore);

  const idEdit = params?.id as unknown as string;

  const { data: dataExternalReferrerDetail } = useGetExternalReferrerById(
    parseInt(idEdit)
  );

  console.log(dataExternalReferrerDetail);

  const methods = useForm<ISubmitCreateStore>({
    resolver: yupResolver(CreateStoreSchema),
    defaultValues: {
      code: dataExternalReferrerDetail?.code,
      name: dataExternalReferrerDetail?.name,
      address: dataExternalReferrerDetail?.address,
      phoneNumber: dataExternalReferrerDetail?.phoneNumber,
      referralCode: dataExternalReferrerDetail?.referralCode,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue,
    getValues,
  } = methods;

  const { mutate, isLoading } = useEditExternalReferrer();

  const onSubmit = (data: ISubmitCreateStore) => {
    const dataResult: ISubmitCreateStore = {
      id: parseInt(idEdit),
      name: data.name,
      code: data.code,
      address: data.address,
      phoneNumber: data.phoneNumber,
      referralCode: data.referralCode,
      status: data?.isActive ? 'ACTIVE' : 'IN_ACTIVE',
    };
    mutate(dataResult);
  };

  useEffect(() => {
    if (dataExternalReferrerDetail) {
      setValue('name', dataExternalReferrerDetail?.name);
      setValue('code', dataExternalReferrerDetail?.code);
      setValue('address', dataExternalReferrerDetail?.address);
      setValue(
        'phoneNumber',
        dataExternalReferrerDetail?.phoneNumber?.replace('+84', '0')
      );
      setValue('referralCode', dataExternalReferrerDetail?.referralCode);
      setValue(
        'isActive',
        dataExternalReferrerDetail?.status === 'ACTIVE' ? true : false
      );
    }
  }, [dataExternalReferrerDetail]);

  return (
    <>
      <Paper elevation={3} sx={{ paddingY: 3 }}>
        <Container>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <RHFTextField
                name="code"
                label={t('manage_store.code_store')}
                InputLabelProps={{ shrink: true }}
                disabled={modeAction === 'detail'}
              />

              <RHFTextField
                name="name"
                label={t('manage_store.name_store')}
                InputLabelProps={{ shrink: true }}
                disabled={modeAction === 'detail'}
              />

              <RHFTextField
                name="address"
                label={t('manage_store.address_store')}
                InputLabelProps={{ shrink: true }}
                disabled={modeAction === 'detail'}
              />

              <RHFTextField
                name="phoneNumber"
                label={t('manage_store.phone_store')}
                InputLabelProps={{ shrink: true }}
                disabled={modeAction === 'detail'}
              />

              <RHFTextField
                name="referralCode"
                label={t('manage_store.referral_code')}
                InputLabelProps={{ shrink: true }}
                disabled={modeAction === 'detail'}
              />
              {modeAction === 'detail' ? null : (
                <RHFSwitch name="isActive" label={t('manage_store.status')} />
              )}
              {!(modeAction === 'detail') && (
                <Stack direction="row" spacing={3} justifyContent="flex-end">
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {t('edit')}
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
              )}
            </Stack>
          </FormProvider>
        </Container>
      </Paper>
    </>
  );
};
