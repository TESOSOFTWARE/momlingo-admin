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
import {
  DEFAULT_VALUE_CATEGORY_FORM,
  SelectGender,
  SelectLang,
} from '../../common/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { IDataEditCategory, IFormEditCategory } from '../../common/interface';
import { EditCategorySchema } from '../../common/schema';
import { useEditCategory } from '../../hooks/useEditCategories';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import { useGetCategoriesById } from '../../hooks/useGetCategoryById';
import i18n from 'src/common/locales/i18n';
import { useGetNameById } from '../../hooks/useGetNameById';
import { useEditName } from '../../hooks/useEditName';

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

  const { mutate, isLoading } = useEditName({
    onSuccess: () => {
      showSuccessSnackbar(t('category.edit.success'));
      navigate(PATH_DASHBOARD.category.list);
    },
    onError: () => showErrorSnackbar(t('category.edit.error')),
  });
  const { data: dataCategoriesById } = useGetNameById(parseInt(categoryId as string));

  useDeepCompareEffect(() => {
    if (dataCategoriesById) {
      const dataVN = {
        lang: dataCategoriesById?.lan,
        name: dataCategoriesById?.name,
        desc: dataCategoriesById?.meaning,
        gender: dataCategoriesById?.gender,
      };
      reset(dataVN);
    }
  }, [dataCategoriesById]);

  const onSubmit = (data: IFormEditCategory) => {
    const editData: any = {
      id: parseInt(categoryId as string),
      lan: data.lang,
      desc: data.desc,
      name: data.name,
      gender: data.gender,
      meaning: data.desc,
    };
    mutate(editData);
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3} sx={{ padding: 3, boxShadow: 10 }}>
          <Stack spacing={3}>
            <RHFSelect name="lang" label="Ngôn ngữ">
              {<option></option>}
              {SelectLang.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
            </RHFSelect>
            <RHFTextField name="name" label="Tên" />
            <RHFSelect name="gender" label="Giới tính">
              {<option></option>}
              {SelectGender.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
            </RHFSelect>
            <RHFTextField multiline name="desc" label="Ý nghĩa" />
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
