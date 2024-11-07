import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Container, Paper, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useMessage from 'src/common/hooks/useMessage';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import vn from '../../../common/locales/vn';
import { useSelector } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { LANG_OPTION, TYPE_OPTION } from '../constants/constants';
import { usePostProductAttribute } from '../hooks/usePostProductAttribute';
import {
  IProductAttribute,
  ISelectLangOption,
  ISelectTypeOption,
  ISubmitProduct,
} from '../interface/interface';
import { setSelectedLangState } from '../product-attribute.slice';
import { PostProductAttributeSchema } from '../schema/product-attribute.schema';

function PostProductAttributeDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { useDeepCompareEffect } = useDeepEffect();
  const selectedLang = useSelector(setSelectedLangState);

  const methods = useForm<ISubmitProduct>({
    resolver: yupResolver(PostProductAttributeSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = methods;
  const { mutate, isSuccess } = usePostProductAttribute({
    onSuccess: () => {
      showSuccessSnackbar(t('attribute.new.addSuccess'));
    },
    onError: () => {
      showErrorSnackbar(t('attribute.new.addFail'));
    },
  });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.product_attribute.list);
  }, [isSuccess]);

  const onSubmit = (data: ISubmitProduct) => {
    const newData: IProductAttribute = {
      type: data.type,
      productAttributeDetails: [
        {
          lang: data.lang,
          name: data.name,
          description: data.description,
        },
      ],
    };
    mutate(newData);
  };
  return (
    <>
      <HeaderBreadcrumbs
        heading={t('attribute.new.titleNew')}
        links={[
          {
            name: BREADCUMBS.DASHBOARD,
            href: PATH_DASHBOARD.root,
          },
          {
            name: t('attribute.new.titleAttribute'),
            href: PATH_DASHBOARD.product_attribute.root,
          },
          {
            name: t('attribute.new.titleNew'),
            href: PATH_DASHBOARD.product_attribute.new,
          },
        ]}
      />
      <Paper elevation={3}>
        <Container sx={{ padding: '25px' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <RHFSelect name={'type'} label={t('attribute.new.labelName')} key={'type'}>
                <option value="" />
                {TYPE_OPTION.map((item: ISelectTypeOption) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                name={'lang'}
                label={t('attribute.new.labelLang')}
                key={`productAttributeDetails.${selectedLang.value}.lang`}
              >
                <option value="" />
                {LANG_OPTION.map((item: ISelectLangOption) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField
                name="name"
                label={t('attribute.new.labelName')}
                key={`productAttributeDetails.${selectedLang.value}.name`}
                InputProps={{
                  endAdornment: (
                    <Iconify
                      icon="jam:write"
                      sx={{ marginLeft: '3px', fontSize: '25px' }}
                    />
                  ),
                }}
              />
              <RHFTextField
                name="description"
                key={`productAttributeDetails.${selectedLang.value}.description`}
                label={t('attribute.new.labelDescription')}
                InputProps={{
                  endAdornment: (
                    <Iconify
                      icon="material-symbols:description-outline-rounded"
                      sx={{ marginLeft: '3px', fontSize: '25px' }}
                    />
                  ),
                }}
              />

              <Stack direction="row" spacing={3} justifyContent="flex-end">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  startIcon={
                    <Iconify icon="material-symbols:add-circle-outline-rounded" />
                  }
                >
                  {t('attribute.new.labelBtnCreate')}
                </LoadingButton>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    navigate(PATH_DASHBOARD.product_attribute.list);
                  }}
                  startIcon={<Iconify icon="material-symbols:cancel-outline-rounded" />}
                >
                  {t('attribute.new.labelBtnCancel')}
                </Button>
              </Stack>
            </Stack>
          </FormProvider>
        </Container>
      </Paper>
    </>
  );
}

export { PostProductAttributeDashboard };
