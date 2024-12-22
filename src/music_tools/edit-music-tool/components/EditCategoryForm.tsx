import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import useMessage from '../../../common/hooks/useMessage';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { DEFAULT_VALUE_CATEGORY_FORM } from '../../common/constant';
import { IFormEditCategory } from '../../common/interface';
import { EditCategorySchema } from '../../common/schema';
import { useEditMusicList } from '../../hooks/useEditCategories';
import { useGetMusicById } from '../../hooks/useGetCategoryById';
import { useGetMusicCategory } from '../../hooks/useGetMusicCategory';

export default function EditCategoryForm() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { useDeepCompareEffect } = useDeepEffect();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const methods = useForm<IFormEditCategory>({
    resolver: yupResolver(EditCategorySchema),
    defaultValues: DEFAULT_VALUE_CATEGORY_FORM,
  });

  // get category
  const { data: dataCategory } = useGetMusicCategory() as any;
  console.log('category', dataCategory);
  const { handleSubmit, reset, setValue, watch, control } = methods;
  const { id: categoryId } = useParams();

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isLoading } = useEditMusicList({
    onSuccess: () => {
      showSuccessSnackbar(t('category.edit.success'));
      navigate(PATH_DASHBOARD.category.list);
    },
    onError: () => showErrorSnackbar(t('category.edit.error')),
  });
  const { data: dataMusicById } = useGetMusicById(parseInt(categoryId as string));

  useDeepCompareEffect(() => {
    if (dataMusicById) {
      const dataVN = {
        artist: dataMusicById?.artist,
        description: dataMusicById?.description,
        name: dataMusicById?.name,
        categoryId: dataMusicById?.cate,
        // fileUrl: dataMusicById?.fileUrl,
      };
      if (dataMusicById?.fileUrl) {
        setAudioUrl(dataMusicById?.fileUrl);
      }
      reset(dataVN);
    }
  }, [dataMusicById]);

  const onSubmit = (data: any) => {
    const formData = new FormData(); // Tạo FormData để gửi tệp
    formData.append('artist', data.artist);
    formData.append('description', data.description);
    formData.append('name', data.name);
    formData.append('category', data.category); // Nếu cần
    if (data.audioFile) {
      formData.append('file', data.audioFile); // Sử dụng tên đúng của file
    }

    mutate(formData);
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3} sx={{ padding: 3, boxShadow: 10 }}>
          <Stack spacing={3}>
            <RHFTextField name="name" label={t('category.new.name')} />
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
