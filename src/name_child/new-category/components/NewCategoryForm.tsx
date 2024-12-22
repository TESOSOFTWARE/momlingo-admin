import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Paper, Stack, debounce } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import useMessage from '../../../common/hooks/useMessage';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { SelectGender, SelectLang } from '../../common/constant';
import { usePostCategory } from '../hooks/usePostCategory';
import { IDataNewCategory, INewCategory } from '../interface';
import { NewCategorySchema } from '../schema/schema';
import { usePostName } from '../hooks/usePostName';

export default function NewCategoryForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const methods = useForm<INewCategory>({
    resolver: yupResolver(NewCategorySchema),
    defaultValues: {
      name: '',
      lang: '',
      gender: '',
      meaning: '',
    },
  });
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

  const { mutate, isLoading } = usePostName({
    onSuccess: () => {
      showSuccessSnackbar('Thêm tên mới thành công');
      navigate(PATH_DASHBOARD.category.list);
    },
    onError: () => showErrorSnackbar('Thêm tên mới thất bại'),
  });
  const onSubmit = (data: INewCategory) => {
    console.log('check');
    const newData: any = {
      lang: data.lang,
      desc: data.desc,
      name: data.name,
      // slug: data.slug,
      gender: data.gender,
      meaning: data.meaning,
    };
    console.log('Submitting data:', newData);
    mutate(newData);
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Stack spacing={3}>
            <RHFTextField name="name" label="Tên là" />

            <RHFSelect name="gender" label="Giới tính là">
              {<option></option>}
              {SelectGender.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
            </RHFSelect>
            <RHFSelect name="lang" label="Ngôn ngữ">
              {<option></option>}
              {SelectLang.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
            </RHFSelect>
            <RHFTextField name="meaning" multiline label="Nghĩa là" onBlur={handleBlur} />
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
