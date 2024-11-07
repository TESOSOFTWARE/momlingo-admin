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
import { schemaPopup } from '../schema';
import { IPopupForm } from '../interface';
import { useCreatePopup } from './hooks/useCreatePopup';
import { useNavigate } from 'react-router-dom';
import { typeLink } from '../constants';
import { DateTimePicker } from '@mui/x-date-pickers';

import { useGetMobileRoute } from '../../config-home/hooks/useGetMobileRoute';
import { FORMAT_DATE_NEWS } from '../../survey/contanst';
export default function PopupCreate() {
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { handleUpload } = usePresignImg();

  const methods = useForm<IPopupForm>({
    resolver: yupResolver(schemaPopup),
    defaultValues: {
      title: '',
      link: '',
      status: false,
      type: typeLink[0]?.value,
      routing: '',
      startDate: '',
      endDate: '',
      ordinal: 0,
    },
  });
  const { mutate, isSuccess } = useCreatePopup({
    onSuccess: () => {
      showSuccessSnackbar(t('popupManage.create.success'));
    },
    onError: () => {
      showErrorSnackbar(t('popupManage.create.fail'));
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
  useEffect(() => {
    if (isSuccess) {
      navigate(PATH_DASHBOARD.popupManage.list);
    }
  }, [isSuccess]);
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

  const handleCancle = () => {
    navigate(PATH_DASHBOARD.popupManage.list);
  };
  const { data } = useGetMobileRoute();
  const onSubmit = async (data: IPopupForm) => {
    const file = await handleUpload(data?.image as File);
    const dataCreate = {
      ...data,
      link:
        data?.type === typeLink[1].value
          ? (data?.link as string)
          : (data?.routing as string),
      image: file?.url,
    };
    delete dataCreate?.type;
    delete dataCreate?.routing;

    mutate(dataCreate);
  };
  return (
    <Page title="Tạo mới popup">
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <HeaderBreadcrumbs
          heading={'Tạo mới popup'}
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
                <RHFTextField name="ordinal" type="number" label="Thứ tự ưu tiên" />
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
