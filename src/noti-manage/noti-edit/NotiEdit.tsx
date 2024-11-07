import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Container,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Table,
  TableContainer,
  TableBody,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Page from '../../common/components/Page';
import {
  FormProvider,
  RHFEditor,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '../../common/components/hook-form';
import { BREADCUMBS } from '../../common/constants/common.constants';
import useMessage from '../../common/hooks/useMessage';
import useSettings from '../../common/hooks/useSettings';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { FORMAT_DATE_NEWS } from '../../survey/contanst';
import {
  DEFAULT_FORM_CREATE_NOTI,
  TABLE_SALE_FORCE_LABEL,
  TYPE_NOTIFICATION,
  sourceType,
  typeLink,
} from '../constants';
import { INotiForm } from '../interface';
import { schemaEditNotifications, schemaNotifications } from '../schema';

import RHFMultipleSelect from '../../common/components/hook-form/RHFMultipleSelect';
import { LabelStyle } from '../../config-home/components/banners-section/BannerConfig';
import { useGetListGroupUser } from '../../user-management/groupUser-manage/hooks/useGetListGroupUser';
import { useGetMobileRoute } from '../noti-create/hooks/useGetMobileRoute';
import { useEditNotifications } from './hooks/useEditNotifications';
import { useGetNotificationById } from './hooks/useGetNotificationById';
import { TableHeadCustom } from '../../common/components/table';
import SaleForceNotiTableRow from './components/TableNotiSaleForceRow';

export default function FormEditNoti() {
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { id: idNoti } = useParams();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const methods = useForm<INotiForm>({
    resolver: yupResolver(schemaEditNotifications),
    defaultValues: DEFAULT_FORM_CREATE_NOTI,
  });
  const { mutate, isSuccess } = useEditNotifications({
    onSuccess: () => {
      showSuccessSnackbar(t('notificationManage.edit.success'));
      navigate(PATH_DASHBOARD.notificationManage.list);
    },
    onError: () => {
      showErrorSnackbar(t('notificationManage.edit.fail'));
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
  const { data: dataNotiID } = useGetNotificationById(parseInt(idNoti as string));

  const onSubmit = (data: INotiForm) => {
    const dataEdit = {
      id: parseInt(idNoti as string),
      data: {
        groupUserIds: data?.source === sourceType.INTERNAL ?  data.groupUserIds : [],
        title: data.title,
        content: data.content,
        deepLink:
          watch('routeType') === typeLink[0].value ? data.link_mobile : data.link_web,
        timeSent: data.timeSent,
        type: data.type,
        routeType: data.routeType,
        shortContent: data.shortContent,
      },
    };
    mutate(dataEdit);
  };

  useEffect(() => {
    if (dataNotiID && dataRoute) {
      reset(dataNotiID);
      setValue(
        'groupUserIds',
        dataNotiID?.notiToUserGroups?.map((item: any) => item.userGroupId)
      );
      if (dataRoute.find((item) => item.route === dataNotiID.deepLink) === undefined) {
        setValue('routeType', typeLink[1].value);
        setValue('link_web', dataNotiID?.deepLink);
      } else {
        setValue('routeType', typeLink[0].value);
        setValue('link_mobile', dataNotiID?.deepLink);
      }
    }
  }, [dataNotiID, dataRoute]);
  return (
    <Page title={t('notificationManage.edit.title')}>
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('notificationManage.edit.title')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            {
              name: t('notificationManage.list.title'),
              href: PATH_DASHBOARD.notificationManage.list,
            },
            {
              name: t('notificationManage.edit.title'),
              href: '',
            },
          ]}
        />
        <Paper elevation={5} sx={{ p: 3 }}>
          {dataNotiID?.sfNotiCustomers?.length ? (
            <TableContainer sx={{ position: 'relative', pb: 3 }}>
              <Table size={'small'}>
                <TableHeadCustom headLabel={TABLE_SALE_FORCE_LABEL} rowCount={5} />
                <TableBody>
                  {dataNotiID?.sfNotiCustomers?.map((row) => (
                    <SaleForceNotiTableRow key={row.id} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
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
                <RHFTextField name="source" label="Source" disabled />
              </Stack>
              <Stack spacing={3} direction="row">
                {dataNotiID?.source === sourceType.INTERNAL ? 
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
                : null}
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
                {watch()?.routeType === typeLink[0].value ? (
                  <RHFSelect
                    name="link_mobile"
                    label="Chọn đường dẫn"
                    SelectProps={{ native: false, MenuProps: { sx: { maxHeight: 300 } } }}
                  >
                    <MenuItem value="" disabled />
                    {dataRoute?.map((item, index: number) => (
                      <MenuItem key={index} value={item?.route}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                ) : (
                  <RHFTextField name="link_web" label="Nhập đường dẫn" />
                )}
              </Stack>
              <RHFTextField name="shortContent" label="Nội dung thông báo đẩy" />
              <LabelStyle>Nội dung</LabelStyle>
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
                {t('edit')}
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Paper>
      </Container>
    </Page>
  );
}
