import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Paper, Stack, debounce } from '@mui/material';
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
import { SelectLang } from '../../common/constant';
import { usePostCategory } from '../hooks/usePostCategory';
import { IDataNewCategory, INewCategory } from '../interface';
import { NewCategorySchema } from '../schema/schema';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { useState } from 'react';
import slugify from 'slugify';

export default function NewCategoryForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const methods = useForm<INewCategory>({ resolver: yupResolver(NewCategorySchema) });
  const { handleSubmit, watch, setValue } = methods;

  const [slug, setSlug] = useState('');
  const getValue = debounce(() => {
    const titleName = watch('name');
    setSlug(slugify(titleName));
  }, 500);
  getValue();
  const handleBlur = debounce(() => {
    setValue('slug', slug);
  }, 250);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isLoading } = usePostCategory({
    onSuccess: () => {
      showSuccessSnackbar(t('category.new.successBar'));
      navigate(PATH_DASHBOARD.category.list);
    },
    onError: () => showErrorSnackbar(t('category.new.errorBar')),
  });
  const onSubmit = (data: INewCategory) => {
    const newData: IDataNewCategory = {
      categoryDetails: [
        {
          lang: data.lang,
          desc: data.desc,
          name: data.name,
          slug: data.slug,
        },
      ],
    };
    mutate(newData);
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Stack spacing={3}>
            <RHFSelect name="lang" label={t('category.new.lang')}>
              {<option></option>}
              {SelectLang.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
            </RHFSelect>
            <RHFTextField
              name="name"
              label={t('category.new.name')}
              onBlur={handleBlur}
            />
            <RHFTextField
              name="slug"
              label={t('category.new.slug')}
              InputLabelProps={{ shrink: true }}
            />
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
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            startIcon={<Iconify icon="material-symbols:add-circle-outline-rounded" />}
          >
            {t('create')}
          </LoadingButton>
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
        </Stack>
      </FormProvider>
    </>
  );
}
