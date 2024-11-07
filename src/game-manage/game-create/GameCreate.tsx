import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Container, Typography, Paper, Stack, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFile
} from '../../common/components/hook-form';
import RHFSearchSelect from '../../common/components/hook-form/RHFSelectSearch';
import Page from '../../common/components/Page';
import { BREADCUMBS } from '../../common/constants/common.constants';
import useMessage from '../../common/hooks/useMessage';
import { usePresignImg } from '../../common/hooks/usePresignImg';
import useSettings from '../../common/hooks/useSettings';
import en from '../../common/locales/en';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { fData } from '../../common/utils/formatNumber';
import { IGameForm } from '../interface';
import { schemaGame } from '../schema';
import { useCreateGame } from './hooks/useCreateGame';
import { useGetTypeGame } from './hooks/useGetTypeGame';
export default function GameCreate() {
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { handleUpload } = usePresignImg();

  const methods = useForm<IGameForm>({
    resolver: yupResolver(schemaGame),
    defaultValues: {
      name: '',
      startDate: '',
      endDate: '',
      status: false,
      gameType: undefined,
      policyLink: '',
    },
  });
  const { mutate, isSuccess } = useCreateGame({
    onSuccess: () => {
      showSuccessSnackbar(t('gameManage.create.success'));
    },
    onError: () => {
      showErrorSnackbar(t('gameManage.create.fail'));
    },
  });
  const {
    reset,
    setValue,
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting, errors },
  } = methods;

  const { data: listProvince } = useGetTypeGame({ page: 1, limit: 10 });
  const listPolicies = listProvince?.items || [];
  useEffect(() => {
    if (isSuccess) {
      navigate(PATH_DASHBOARD.gameManage.list);
    }
  }, [isSuccess]);
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'imageId',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const handleCancle = () => {
    navigate(PATH_DASHBOARD.gameManage.list);
  };

  const onSubmit = async (data: IGameForm) => {
    const file = await handleUpload(data?.imageId as File);
    const dataCreate = {
      ...data,
      status: data?.status ? 'ACTIVE' : 'INACTIVE',
      imageId: file?.id,
      gameTypeId:data?.gameType?.id
    };
    delete dataCreate?.gameType
    mutate(dataCreate);
  };
  
  return (
    <Page title={t('gameManage.list.createButton')}>
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('gameManage.list.createButton')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            {
              name: t('gameManage.list.title'),
              href: PATH_DASHBOARD.gameManage.list,
            },
            {
              name: t('gameManage.list.createButton'),
              href: PATH_DASHBOARD.popupManage.create,
            },
          ]}
        />
        <Paper elevation={5} sx={{ p: 3 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} direction="row">
              <Stack flex={1}>
                <RHFUploadSingleFile
                  name="imageId"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  accept={{ 'image/*': [] }}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        flex: 1,
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      {t('allowed')} *.jpeg, *.jpg, *.png, *.gif
                      <br /> {t('max_size_of')} {fData(3145728)}
                    </Typography>
                  }
                />
              </Stack>
              <Stack spacing={3} flex={2}>
                <RHFTextField name="name" label="Tên" />
                <RHFSearchSelect
                onKeyPress={(e) => {e.preventDefault();}}
                  name="gameType"
                  options={listPolicies}
                  labelProp="type"
                  valueProp="id"
                  label="Loại trò chơi"
                />
                <RHFTextField name="policyLink" label="Link điều khoản trò chơi" />
                <Stack
                  spacing={'10px'}
                  direction="row"
                  alignItems={'center'}
                  position="relative"
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
                </Stack>
                <RHFSwitch name="status" label="Trạng thái" />
              </Stack>
            </Stack>
            <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                color="inherit"
                size="medium"
                variant="contained"
                onClick={handleCancle}
              >
                {t('cancel')}
              </Button>
              <LoadingButton
                size="large"
                variant="contained"
                loading={isSubmitting}
                type="submit"
              >
                {t('create')}
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Paper>
      </Container>
    </Page>
  );
}
