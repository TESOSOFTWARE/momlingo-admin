import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Paper, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../common/components/hook-form';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import useMessage from '../../../common/hooks/useMessage';
import vn from '../../../common/locales/vn';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { attributeLang, attributeType } from '../constant';
import { useGetAttributeById } from '../hooks/useGetAttributeById';
import { usePutAttribute } from '../hooks/usePutAttribute';
import { IConvertAttribute, IPutAttribute } from '../interface';
import { PutProductAttributeSchema } from '../schema/attribute.schema';

export default function AttributeFormEdit() {
  const navigate = useNavigate();
  const { useDeepCompareEffect } = useDeepEffect();
  const methods = useForm<IConvertAttribute>({
    resolver: yupResolver(PutProductAttributeSchema),
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = methods;
  const { t } = useTranslation();

  const params = useParams();
  const idSelect = params?.id as unknown as number;

  const { data: detailAttribute } = useGetAttributeById(idSelect);

  useDeepCompareEffect(() => {
    if (detailAttribute) {
      reset({
        type: detailAttribute.type,
        lang: detailAttribute.productAttributeDetails[0].lang,
        name: detailAttribute.productAttributeDetails[0].name,
        description: detailAttribute.productAttributeDetails[0].description,
      });
    }
  }, [detailAttribute]);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate, isSuccess, isLoading } = usePutAttribute({
    onSuccess: () => showSuccessSnackbar(t('attribute.edit.editSuccess')),
    onError: () => showErrorSnackbar(t('attribute.edit.editSuccess')),
  });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.product_attribute.list);
  }, [isSuccess]);

  const onSubmit = (data: IConvertAttribute) => {
    const newData: IPutAttribute = {
      type: data.type,
      productAttributeDetails: [
        {
          lang: data.lang,
          name: data.name,
          description: data.description,
        },
      ],
      id: idSelect,
    };
    mutate({ data: newData });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3} sx={{ marginRight: '40px' }}>
        <Stack spacing={3} sx={{ padding: 3 }}>
          <RHFSelect name="type" label={t('attribute.edit.labelType')}>
            {attributeType.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </RHFSelect>
          <RHFSelect name="lang" label={t('attribute.edit.labelLang')}>
            {attributeLang.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </RHFSelect>
          <RHFTextField
            name="name"
            label={t('attribute.edit.labelName')}
            InputLabelProps={{ shrink: true }}
          />
          <RHFTextField
            name="description"
            label={t('attribute.edit.labelDescription')}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
      </Paper>

      <Stack
        spacing={3}
        direction="row"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: 3,
          marginRight: 6,
        }}
      >
        <LoadingButton variant="contained" loading={isLoading} type="submit">
          {t('attribute.edit.labelBtnSave')}
        </LoadingButton>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => navigate(PATH_DASHBOARD.product_attribute.list)}
        >
          {t('attribute.edit.labelBtnCancel')}
        </Button>
      </Stack>
    </FormProvider>
  );
}
