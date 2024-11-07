import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Page from '../../common/components/Page';
import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../common/components/hook-form';
import RHFSearchSelect from '../../common/components/hook-form/RHFSelectSearch';
import { BREADCUMBS } from '../../common/constants/common.constants';
import useMessage from '../../common/hooks/useMessage';
import { usePresignImg } from '../../common/hooks/usePresignImg';
import useSettings from '../../common/hooks/useSettings';
import en from '../../common/locales/en';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { fData } from '../../common/utils/formatNumber';
import { useGetTypeGame } from '../game-create/hooks/useGetTypeGame';
import { IGetGameIDForm } from '../interface';
import { schemaGame } from '../schema';
import { useEditGame } from './hooks/useEditGame';
import { useGetGameById } from './hooks/useGetGameById';

export default function GameEdit() {
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { handleUpload } = usePresignImg();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const methods = useForm<IGetGameIDForm>({
    resolver: yupResolver(schemaGame),
    defaultValues: {
      name: '',
      startDate: '',
      endDate: '',
      status: false,
      gameType: {
        id: 0,
        type: '',
      },
      policyLink: '',
    },
  });

  const {
    reset,
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = methods;
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
  const getImageInfo = async (file: File): Promise<{ id: number; url: string }> => {
    const imgInfo = await handleUpload(file);
    return imgInfo;
  };

  const { id } = useParams();
  const { data: dataGame } = useGetGameById(parseInt(id as string));
  const { data: listProvince } = useGetTypeGame({ page: 1, limit: 10 });
  const listPolicies = listProvince?.items || [];
  useEffect(() => {
    if (dataGame) {
      reset(dataGame);
      setValue('status', dataGame?.status === 'ACTIVE' ? true : false);
    }
  }, [dataGame]);
  const { mutate, isSuccess } = useEditGame({
    onSuccess: () => {
      showSuccessSnackbar(t('gameManage.edit.success'));
      navigate(PATH_DASHBOARD.gameManage.list);
    },
    onError: () => showErrorSnackbar(t('gameManage.edit.fail')),
  });
  useEffect(() => {
    if (isSuccess) {
      navigate(PATH_DASHBOARD.gameManage.list);
    }
  }, [isSuccess]);
  const onSubmit = async (data: IGetGameIDForm) => {
    let imgId = dataGame?.image?.id;
    if (typeof data?.imageId === 'object') {
      const file = await handleUpload(data.imageId as File);
      imgId = file?.id;
    }
    const dataEdit = {
      ...data,
      imageId: imgId as number,
      status: data?.status ? 'ACTIVE' : 'INACTIVE',
      gameTypeId: data?.gameType?.id,
    };
    delete dataEdit?.gameType;
    delete dataEdit?.image;
    mutate(dataEdit);
  };
  const handleCancle = () => {
    navigate(PATH_DASHBOARD.gameManage.list);
  };
  return (
    <Page title={t('gameManage.edit.title')}>
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('gameManage.edit.title')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            {
              name: t('gameManage.list.title'),
              href: PATH_DASHBOARD.gameManage.list,
            },
            {
              name: t('gameManage.edit.title'),
              href: PATH_DASHBOARD.gameManage.create,
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
                {t('Save')}
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Paper>
      </Container>
    </Page>
  );
}
