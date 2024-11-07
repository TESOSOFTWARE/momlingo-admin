import {
  Box,
  Button,
  Container,
  FormLabel,
  Grid,
  Paper,
  Stack,
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
import { schemaTermPolicy } from '../common/terms-policy.schema';
import {
  INewTermsPolicy,
  ISelectLangOption,
  ITermPolicyForm,
  IUpdateTermPolicyForm,
  IUpdateTermsPolicy,
} from '../common/interface';
import { LANG_OPTION } from '../../product-attribute-merchant/product-attribute-create/constants/constants';
import {
  STATUS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
  defaultUpdateValueForm,
  defaultValueForm,
} from '../common/constant';
import { ISelectTypeOption } from '../../product-attribute-merchant/product-attribute-create/interface/interface';
import { fData } from '../../common/utils/formatNumber';
import { usePresignImg } from '../../common/hooks/usePresignImg';
import { useNavigate, useParams } from 'react-router-dom';

import useDeepEffect from '../../common/hooks/useDeepEffect';
import { useUpdateTermPolicy } from './hooks/useUpdateTermPolicy';
import { useGetTermPolicy } from '../terms-policy-view/hooks/useGetTermPolicy';

export default function TermPolicyEdit() {
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  const { handleUpload } = usePresignImg();
  const navigate = useNavigate();
  const params = useParams();
  const { useDeepCompareEffect } = useDeepEffect();

  const methods = useForm<IUpdateTermPolicyForm>({
    resolver: yupResolver(schemaTermPolicy),
    defaultValues: defaultUpdateValueForm,
  });
  const {
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = methods;
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const id = params?.id as unknown as number;

  const { data:dataTerm } = useGetTermPolicy(id);

  useDeepCompareEffect(() => {
    if (dataTerm) {
      reset({
        id: dataTerm.id,
        content: dataTerm.content,
        icon: dataTerm.iconUrl,
        lang: dataTerm.lang,
        name: dataTerm.name,
        status: dataTerm.status === STATUS.ACTIVE ? true : false,
        termPolicyDetailId: dataTerm.termsPolicyDetailId,
        type: dataTerm.type,
      });
    }
  }, [dataTerm]);

  const { mutate, isSuccess } = useUpdateTermPolicy({
    onSuccess: () => {
      showSuccessSnackbar(`${t('termPolicy.common.create.success')}`);
      navigate(PATH_DASHBOARD.termPolicy.list);
    },
    onError: () => showErrorSnackbar(`${t('termPolicy.common.create.fail')}`),
  });

  const onSubmit = async (data: IUpdateTermPolicyForm) => {
    let iconId = dataTerm?.iconId 

    if(typeof data?.icon === 'object'){
    const image = await getImageInfo(data.icon as File);

       iconId = image?.id
    }
    const updateTermPolicy: IUpdateTermsPolicy = {
      id: id,
      type: data.type,
      iconId: iconId || 0,
      status: data.status ? STATUS.ACTIVE : STATUS.IN_ACTIVE,
      termsPolicyDetails: [
        {
          id: data.termPolicyDetailId,
          content: data.content,
          lang: data.lang,
          name: data.name,
        },
      ],
    };
    mutate(updateTermPolicy);
    console.log(updateTermPolicy);
  };

  const getImageInfo = async (file: File): Promise<{ id: number; url: string }> => {
    const imgInfo = await handleUpload(file);
    return imgInfo;
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'icon',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Page title={t('termPolicy.update.root')}>
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('termPolicy.update.root')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            { name: t('termPolicy.list.root'), href: PATH_DASHBOARD.termPolicy.list },
            {
              name: t('termPolicy.update.root'),
              href: PATH_DASHBOARD.termPolicy.edit(Number(dataTerm?.id)),
            },
          ]}
        />
        <Paper elevation={5} sx={{ p: 3 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <FormLabel sx={{ marginLeft: '14px' }}>
                  {t('termPolicy.common.form.icon')}
                </FormLabel>
                <RHFUploadSingleFile
                  name="icon"
                  maxSize={3145728}
                  onDrop={handleDrop}
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
                    <RHFTextField name="name" label={vn.termPolicy.common.form.name} />
                  </Grid>
                  <Grid item xs={12}>
                    <RHFSelect
                      name="type"
                      label={vn.termPolicy.common.form.type}
                      key="type"
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
                    >
                      {LANG_OPTION.map((item: ISelectLangOption) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </RHFSelect>
                  </Grid>
                  <Grid item xs={12}>
                    <RHFSwitch name="status" label={vn.termPolicy.common.form.status} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Stack spacing={3}>
              <FormLabel sx={{ marginLeft: '14px' }}>
                {t('termPolicy.common.form.content')}
              </FormLabel>
              <RHFEditor name="content" />
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
              <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button
                  color="inherit"
                  size="medium"
                  variant="contained"
                  onClick={() => {
                    navigate(PATH_DASHBOARD.termPolicy.view(dataTerm?.id as number));
                  }}
                >
                  {t('termPolicy.common.view.return')}
                </Button>
                <LoadingButton
                  color="secondary"
                  size="large"
                  variant="contained"
                  loading={isSubmitting}
                  type="submit"
                >
                  {t('edit')}
                </LoadingButton>
              </Stack>
            </Stack>
          </FormProvider>
        </Paper>
      </Container>
    </Page>
  );
}
