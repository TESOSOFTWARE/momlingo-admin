import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Paper, Stack, debounce } from '@mui/material';
import { t } from 'i18next';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import useMessage from '../../../common/hooks/useMessage';
import { SelectGender, SelectLang } from '../../common/constant';
import { usePostCategory } from '../hooks/usePostCategory';
import { IDataNewCategory, INewCategory } from '../interface';
import { NewCategorySchema } from '../schema/schema';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { useState } from 'react';
import slugify from 'slugify';
import { useGetMusicCategory } from '../../hooks/useGetMusicCategory';

export default function NewCategoryForm() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const methods = useForm<INewCategory>({ resolver: yupResolver(NewCategorySchema) });
  const { handleSubmit, watch, setValue, control } = methods;

  const [slug, setSlug] = useState('');
  const getValue = debounce(() => {
    const titleName = watch('name');
    setSlug(slugify(titleName));
  }, 500);
  getValue();

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isLoading } = usePostCategory({
    onSuccess: () => {
      showSuccessSnackbar(t('category.new.successBar'));
      navigate(PATH_DASHBOARD.musicTool.list);
    },
    onError: () => showErrorSnackbar(t('category.new.errorBar')),
  });

  // get category
  const { data: dataCategory } = useGetMusicCategory() as any;
  console.log('category', dataCategory);

  const onSubmit = (data: INewCategory) => {
    console.log('cate', data.category);
    const formData = new FormData(); // Tạo FormData để gửi tệp
    formData.append('artist', data.artist);
    formData.append('description', data.description);
    formData.append('name', data.name);
    formData.append('categoryId', data.category); // Nếu cần
    if (data.audioFile) {
      formData.append('file', data.audioFile); // Sử dụng tên đúng của file
    }

    mutate(formData);
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Stack spacing={3}>
            <RHFTextField
              name="name"
              // label={t('category.new.name')}
              label="Tên là"
            />
            <RHFTextField name="artist" label="Tên tác giả" />

            <RHFTextField name="description" multiline label={t('category.new.desc')} />
            <RHFSelect name="category" label="Chọn danh mục bài hát">
              {<option></option>}
              {dataCategory?.map((item: { name: string; id: string }) => (
                <option value={item?.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </RHFSelect>
            <Controller
              name="audioFile"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => {
                    // Ensure you capture the file(s) selected by the user
                    const file = e.target.files ? e.target.files[0] : null;
                    if (file) {
                      // field.onChange(e.target.files);
                      field.onChange(file);
                      // Create a URL for the selected audio file
                      const audioUrl = URL.createObjectURL(file);
                      setAudioUrl(audioUrl); // Set the audio URL for playback
                    }
                  }}
                />
              )}
            />
            {audioUrl && (
              <audio controls>
                <source src={audioUrl} type="audio/*" />
                Your browser does not support the audio element.
              </audio>
            )}
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
