import {
  Box,
  Button,
  Container,
  FormLabel,
  Grid,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import {
  FormProvider,
  RHFEditor,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../common/components/hook-form';
import Page from '../../common/components/Page';
import { BREADCUMBS } from '../../common/constants/common.constants';
import useSettings from '../../common/hooks/useSettings';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import vn from '../../common/locales/vn';
import useMessage from '../../common/hooks/useMessage';
import { LoadingButton } from '@mui/lab';
import { INewTermsPolicy, ISelectLangOption, ITermPolicyForm } from '../common/interface';
import { LANG_OPTION } from '../../product-attribute-merchant/product-attribute-create/constants/constants';
import {
  STATUS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
  defaultValueForm,
} from '../common/constant';
import { ISelectTypeOption } from '../../product-attribute-merchant/product-attribute-create/interface/interface';
import { fData } from '../../common/utils/formatNumber';
import { usePresignImg } from '../../common/hooks/usePresignImg';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTermPolicy } from './hooks/useGetTermPolicy';
import useDeepEffect from '../../common/hooks/useDeepEffect';
import { replacePathParams } from '../../common/utils/replaceParams';
import { schemaTermPolicy } from '../common/terms-policy.schema';

export default function TermPolicyView() {
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const { handleUpload } = usePresignImg();
  const navigate = useNavigate();
  const params = useParams();
  const { useDeepCompareEffect } = useDeepEffect();

  const methods = useForm<ITermPolicyForm>({
    resolver: yupResolver(schemaTermPolicy),
    defaultValues: defaultValueForm,
  });
  const {
    setValue,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = methods;
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const id = params?.id as unknown as number;

  const { data } = useGetTermPolicy(id);

  useDeepCompareEffect(() => {
    if (data) {
      reset({
        type: data.type,
        lang: data.lang,
        name: data.name,
        content: data.content,
        icon: data.iconUrl,
        status: data.status === 'ACTIVE' ? true : false,
      });
    }
    setValue('content', data?.content as string);
  }, [data]);

  return (
    <Page title={'Xem chính sách điều khoản'}>
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <HeaderBreadcrumbs
          heading="Xem chính sách điều khoản"
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            { name: t('termPolicy.list.root'), href: PATH_DASHBOARD.termPolicy.list },
            {
              name: t('termPolicy.create.root'),
              href: PATH_DASHBOARD.termPolicy.create,
            },
          ]}
        />
        <Paper elevation={5} sx={{ p: 3 }}>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <FormLabel sx={{ marginLeft: '14px' }}>
                  {t('termPolicy.common.form.icon')}
                </FormLabel>
                <RHFUploadSingleFile
                  name="icon"
                  maxSize={3145728}
                  disabled={true}
                  accept={{ 'image/*': [] }}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      {t('termPolicy.common.form.icon')} *.jpeg, *.jpg, *.png, *.gif
                      <br />
                      Max size: {fData(3145728)}
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel sx={{ marginLeft: '14px' }}>
                  {t('termPolicy.common.form.info')}
                </FormLabel>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <RHFTextField
                      name="name"
                      label={vn.termPolicy.common.form.name}
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <RHFSelect
                      name="type"
                      label={vn.termPolicy.common.form.type}
                      key="type"
                      disabled={true}
                    >
                      {TYPE_OPTIONS.map((item: ISelectTypeOption) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </RHFSelect>
                  </Grid>
                  <Grid item xs={12}>
                    <RHFSelect
                      name="lang"
                      label={vn.termPolicy.common.form.lang}
                      key="lang"
                      disabled={true}
                    >
                      {LANG_OPTION.map((item: ISelectLangOption) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </RHFSelect>
                  </Grid>
                  <Grid item xs={12}>
                    <Switch
                      disabled={true}
                      checked={data?.status === 'ACTIVE' ? true : false}
                    />
                    <FormLabel sx={{ marginLeft: '14px' }}>
                      {t('termPolicy.common.form.status')}
                    </FormLabel>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Stack spacing={3}>
              <FormLabel sx={{ marginLeft: '14px' }}>
                {t('termPolicy.common.form.content')}
              </FormLabel>
              <RHFEditor name="content" disabled={true} />
            </Stack>
            <Stack
              justifyContent="space-between"
              direction="row"
              spacing={2}
              sx={{ mt: 3 }}
            >
              <Button
                color="inherit"
                size="medium"
                variant="contained"
                onClick={() => {
                  navigate(PATH_DASHBOARD.termPolicy.list);
                }}
              >
                {t('termPolicy.common.list.return')}
              </Button>
              <LoadingButton
                size="large"
                variant="contained"
                loading={isSubmitting}
                onClick={() =>
                  navigate(PATH_DASHBOARD.termPolicy.edit(data?.id as number))
                }
              >
                {t('termPolicy.update.root')}
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Paper>
      </Container>
    </Page>
  );
}
