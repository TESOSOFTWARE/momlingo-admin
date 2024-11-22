import {
  Autocomplete,
  Button,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import {
  FormProvider,
  RHFEditor,
  RHFRadioGroup,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadMultiFile,
  RHFUploadSingleFile,
} from '../../common/components/hook-form';
import Page from '../../common/components/Page';
import { BREADCUMBS } from '../../common/constants/common.constants';
import useSettings from '../../common/hooks/useSettings';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { fData } from '../../common/utils/formatNumber';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePresignImg } from '../../common/hooks/usePresignImg';
import { useCallback, useEffect } from 'react';
import useMessage from '../../common/hooks/useMessage';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import {
  DEFAULT_FORM_CREATE_NOTI,
  TYPE_NOTI,
  TYPE_NOTIFICATION,
  typeLink,
} from '../constants';
import { FORMAT_DATE_NEWS } from '../../survey/contanst';
import { DateTimePicker } from '@mui/x-date-pickers';
import { dispatch, useSelector } from '../../common/redux/store';
import { schemaNotifications } from '../schema';
import { INotiForm, IResRoute } from '../interface';
import { useCreateNotification } from './hooks/useCreateNotifications';
import { useGetMobileRoute } from './hooks/useGetMobileRoute';
import RHFMultipleSelect from '../../common/components/hook-form/RHFMultipleSelect';
import { useGetListGroupUser } from '../../user-management/groupUser-manage/hooks/useGetListGroupUser';
import { LabelStyle } from '../../config-home/components/banners-section/BannerConfig';

export default function FormCreateNoti() {
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const methods = useForm<INotiForm>({
    resolver: yupResolver(schemaNotifications),
    defaultValues: DEFAULT_FORM_CREATE_NOTI,
  });
  const { mutate, isSuccess } = useCreateNotification({
    onSuccess: () => {
      showSuccessSnackbar(t('notificationManage.create.success'));
    },
    onError: () => {
      showErrorSnackbar(t('notificationManage.create.fail'));
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
      navigate(PATH_DASHBOARD.notificationManage.list);
    }
  }, [isSuccess]);

  const handleCancle = () => {
    navigate(PATH_DASHBOARD.notificationManage.list);
  };

  const { data: dataRoute } = useGetMobileRoute();
  const { data: dataGroupUser } = useGetListGroupUser({});

  const onSubmit = (data: INotiForm) => {
    const dataCreate = {
      groupUserIds: data.groupUserIds,
      title: data.title,
      content: data.content,
      deepLink:
        watch('routeType') === typeLink[0].value ? data.link_mobile : data.link_web,
      timeSent: data.timeSent,
      type: data.type,
      routeType: data.routeType,
      shortContent: data.shortContent,
    };
    mutate(dataCreate);
  };
  return (
    <Page title={t('notificationManage.list.createButton')}>
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('notificationManage.list.createButton')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            {
              name: t('notificationManage.list.title'),
              href: PATH_DASHBOARD.notificationManage.list,
            },
            {
              name: t('notificationManage.list.createButton'),
              href: PATH_DASHBOARD.notificationManage.create,
            },
          ]}
        />
        <Paper elevation={5} sx={{ p: 3 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} direction="column">
              <Stack spacing={3} direction="row">
                <RHFTextField name="title" label="Tên" />
                <RHFSelect
                  name="type"
                  label="Loại thông báo"
                  SelectProps={{ native: false }}
                >
                  <MenuItem value="" disabled></MenuItem>
                  {Object.values(TYPE_NOTIFICATION)?.map((item, key: number) => (
                    <MenuItem key={key} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Stack>
              <Stack spacing={3} direction="row">
                <RHFMultipleSelect
                  name="groupUserIds"
                  fullWidth
                  label="Chọn nhóm người dùng"
                >
                  <MenuItem value="" disabled>
                    {' '}
                  </MenuItem>
                  {dataGroupUser?.items?.map((item, index: number) => (
                    <MenuItem key={index} value={item?.id}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </RHFMultipleSelect>
                <Controller
                  name="timeSent"
                  control={control}
                  render={({ field }) => (
                    <Stack position="relative" width="100%">
                      <DateTimePicker
                        {...field}
                        label="Ngày gửi thông báo"
                        inputFormat={FORMAT_DATE_NEWS}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            helperText={errors.timeSent && errors.timeSent?.message}
                            error={!!errors.timeSent}
                          />
                        )}
                      />
                    </Stack>
                  )}
                />
              </Stack>
              <Stack spacing={3} direction={'row'} alignItems={'center'}>
                <RHFRadioGroup name="routeType" options={typeLink} />
                {watch()?.routeType === typeLink[1].value ? (
                  <RHFTextField name="link_web" label="Nhập đường dẫn" />
                ) : (
                  <RHFSelect
                    name="link_mobile"
                    label="Chọn đường dẫn"
                    SelectProps={{ native: false, MenuProps: { sx: { maxHeight: 300 } } }}
                  >
                    <MenuItem value="" disabled>
                      {' '}
                    </MenuItem>
                    {dataRoute?.map((item: IResRoute, index: number) => (
                      <MenuItem key={index} value={item?.route}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                )}
              </Stack>
              <RHFTextField name="shortContent" label="Nội dung thông báo đẩy" />
              <LabelStyle>Nội dung chi tiết</LabelStyle>
              <RHFEditor simple name="content" />
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
