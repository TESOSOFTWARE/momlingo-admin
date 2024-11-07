import {
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  Box,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import {
  FormProvider,
  RHFRadioGroup,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../common/components/hook-form';
import Page from '../../common/components/Page';
import { BREADCUMBS } from '../../common/constants/common.constants';
import useSettings from '../../common/hooks/useSettings';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { fData } from '../../common/utils/formatNumber';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePresignImg } from '../../common/hooks/usePresignImg';
import { useCallback, useEffect } from 'react';
import useMessage from '../../common/hooks/useMessage';
import { LoadingButton } from '@mui/lab';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPopupById } from './hooks/useGetPopupById';
import { useEditPopup } from './hooks/useEditPopup';
import vn from '../../common/locales/vn';
import { IPopupForm, IPopupList } from '../interface';
import { schemaPopup } from '../schema';
import { typeLink } from '../constants';
import { useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';
import { isValidURL } from '../../common/constants/common.utils';
import { useGetMobileRoute } from '../../config-home/hooks/useGetMobileRoute';
import { DateTimePicker } from '@mui/x-date-pickers';
import { FORMAT_DATE_NEWS } from '../../survey/contanst';

export default function PopupEdit() {
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { handleUpload } = usePresignImg();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const methods = useForm<IPopupForm>({
    resolver: yupResolver(schemaPopup),
    defaultValues: {
      title: '',
      link: '',
      image: '',
      type: '',
      routing: '',
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

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'image',
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
  const { data: dataPopup } = useGetPopupById(id as string);
  useEffect(() => {
    if (dataPopup) reset(dataPopup);
    setValue(
      'type',
      isValidURL(dataPopup?.link as string) ? typeLink[1].value : typeLink[0].value
    );
    isValidURL(dataPopup?.link as string)
      ? setValue('link', dataPopup?.link as string)
      : setValue('routing', dataPopup?.link as string);
    watch()?.type === typeLink[1].value ? setValue('routing', '') : setValue('link', '');
  }, [dataPopup]);
  useEffect(() => {
    watch()?.type === typeLink[1].value ? setValue('routing', '') : setValue('link', '');
  }, [watch()?.type]);

  const { mutate, isSuccess } = useEditPopup({
    onSuccess: () => {
      showSuccessSnackbar(t('popupManage.edit.success'));
      navigate(PATH_DASHBOARD.popupManage.list);
    },
    onError: () => showErrorSnackbar(t('popupManage.edit.fail')),
  });
  const { data } = useGetMobileRoute();
  useEffect(() => {
    if (isSuccess) {
      navigate(PATH_DASHBOARD.popupManage.list);
    }
  }, [isSuccess]);
  const onSubmit = async (data: IPopupForm) => {
    const file = await handleUpload(data?.image as File);
    const dataEdit = {
      ...data,
      image: typeof data?.image === 'string' ? data?.image : file?.url,
      link:
        data?.type === typeLink[1].value
          ? (data?.link as string)
          : (data?.routing as string),
      id: id as string,
    };
    delete dataEdit?.type;
    delete dataEdit?.routing;
    mutate(dataEdit);
  };
  const handleCancle = () => {
    navigate(PATH_DASHBOARD.popupManage.list);
  };
  return (
    <Page title={t('popupManage.edit.title')}>
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('popupManage.edit.title')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            { name: t('popupManage.list.title'), href: PATH_DASHBOARD.popupManage.list },
            {
              name: t('popupManage.edit.title'),
              href: PATH_DASHBOARD.popupManage.create,
            },
          ]}
        />
        <Paper elevation={5} sx={{ p: 3 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} direction="row">
              <Stack flex={1}>
                <RHFUploadSingleFile
                  name="image"
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
                <RHFTextField name="title" type="text" label="Tiêu đề" />
                <RHFRadioGroup
                  aria-labelledby="type-label"
                  name="type"
                  options={typeLink}
                />
                {watch()?.type === typeLink[1].value ? (
                  <RHFTextField name="link" type="text" label="Đường dẫn" />
                ) : (
                  <RHFSelect name="routing" label="Select your routing">
                    <option></option>
                    {data?.map((item: any, index: any) => (
                      <option key={index} value={item?.route}>
                        {item?.name}
                      </option>
                    ))}
                  </RHFSelect>
                )}
                <RHFTextField
                  name="ordinal"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  label="Thứ tự ưu tiên"
                />
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
                          label="Ngày bắt đầu"
                          inputFormat={FORMAT_DATE_NEWS}
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
                  <Box sx={{ mx: 2 }}>-</Box>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <Stack position={'relative'} width="100%">
                        <DateTimePicker
                          {...field}
                          label="Ngày kết thúc"
                          inputFormat={FORMAT_DATE_NEWS}
                          renderInput={(params) => (
                            <TextField
                              {...params}
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
