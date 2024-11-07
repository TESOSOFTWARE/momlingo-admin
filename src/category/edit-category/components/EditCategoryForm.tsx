import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Paper, Stack } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import useMessage from '../../../common/hooks/useMessage';
import { DEFAULT_VALUE_CATEGORY_FORM, SelectLang } from '../../common/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { IDataEditCategory, IFormEditCategory } from '../../common/interface';
import { EditCategorySchema } from '../../common/schema';
import { useEditCategory } from '../../hooks/useEditCategories';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import { useGetCategoriesById } from '../../hooks/useGetCategoryById';
import i18n from 'src/common/locales/i18n';

export default function EditCategoryForm() {
  const { useDeepCompareEffect } = useDeepEffect();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const methods = useForm<IFormEditCategory>({
    resolver: yupResolver(EditCategorySchema),
    defaultValues: DEFAULT_VALUE_CATEGORY_FORM,
  });
  const { handleSubmit, reset, setValue, watch } = methods;
  const { id: categoryId } = useParams();

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isLoading } = useEditCategory({
    onSuccess: () => {
      showSuccessSnackbar(t('category.edit.success'));
      navigate(PATH_DASHBOARD.category.list);
    },
    onError: () => showErrorSnackbar(t('category.edit.error')),
  });
  const { data: dataCategoriesById } = useGetCategoriesById(
    parseInt(categoryId as string)
  );

  useDeepCompareEffect(() => {
    if (dataCategoriesById) {
      const dataVN = {
        lang: dataCategoriesById?.categoryDetails[0].lang,
        name: dataCategoriesById?.categoryDetails[0].name,
        desc: dataCategoriesById?.categoryDetails[0].desc,
        slug: dataCategoriesById?.categoryDetails[0].slug,
      };
      reset(dataVN);
    }
  }, [dataCategoriesById]);

  const onSubmit = (data: IFormEditCategory) => {
    const editData: IDataEditCategory = {
      id: parseInt(categoryId as string),
      categoryDetails: [
        {
          id: parseInt(categoryId as string),
          lang: data.lang,
          desc: data.desc,
          name: data.name,
          slug: data.slug,
        },
      ],
    };
    mutate(editData);
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3} sx={{ padding: 3, boxShadow: 10 }}>
          <Stack spacing={3}>
            <RHFSelect name="lang" label={t('category.new.lang')}>
              {<option></option>}
              {SelectLang.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
            </RHFSelect>
            <RHFTextField name="name" label={t('category.new.name')} />
            <RHFTextField name="slug" label={t('category.new.slug')} />
            <RHFTextField name="desc" label={t('category.new.desc')} />
          </Stack>
        </Paper>
        <Stack
          direction={'row'}
          spacing={3}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 3,
            marginRight: 5,
          }}
        >
          <Button
            color={'inherit'}
            variant="contained"
            startIcon={<Iconify icon="material-symbols:cancel-outline-rounded" />}
            onClick={() => {
              navigate(PATH_DASHBOARD.category.list);
            }}
          >
            {t('cancel')}
          </Button>
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            startIcon={<Iconify icon="material-symbols:add-circle-outline-rounded" />}
          >
            {t('edit')}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
}
