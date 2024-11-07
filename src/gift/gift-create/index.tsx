import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import {
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../common/components/hook-form';
import Page from '../../common/components/Page';
import { BREADCUMBS } from '../../common/constants/common.constants';
import useSettings from '../../common/hooks/useSettings';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { fData } from '../../common/utils/formatNumber';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GiftCreateSchema } from './schema/giftCreate.schema';
import { IFormCreateGift, IFormGift } from '../common/interface';
import { usePresignImg } from '../../common/hooks/usePresignImg';
import { useCallback } from 'react';
import useMessage from '../../common/hooks/useMessage';

import { useCreateGift } from './hooks/useCreateGift';

export default function GiftCreate() {
  const { t } = useTranslation();
  const { themeStretch } = useSettings();

  const { handleUpload } = usePresignImg();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate, isSuccess } = useCreateGift();

  const methods = useForm<IFormGift>({
    resolver: yupResolver(GiftCreateSchema),
    defaultValues: {
      name: '',
      price: 0,
      thumbnailId: 0,
    },
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const getImageInfo = async (file: File): Promise<{ id: number; url: string }> => {
    const imgInfo = await handleUpload(file);
    return imgInfo;
  };

  const onSubmit = async (data: IFormGift) => {
    console.log(data.photoURL);
    if (data.thumbnailId === 0 && data.photoURL === undefined) {
      showErrorSnackbar('Thumbnail is required');
      return;
    }
    const image = await getImageInfo(data?.photoURL as File);
    const dataCreate: IFormCreateGift = {
      name: data.name,
      price: data.price,
      thumbnailId: image?.id,
    };
    mutate(dataCreate);
  };

  return (
    <Page title={t('createGift')}>
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('createGift')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            { name: t('giftList'), href: PATH_DASHBOARD.gift.list },
            { name: t('createGift'), href: PATH_DASHBOARD.gift.create },
          ]}
        />
        <Paper elevation={5} sx={{ p: 3 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} alignItems="flex-end">
              <RHFTextField name="name" type="text" label="Name" />
              <RHFTextField name="price" type="number" label="Price" />
              <RHFUploadSingleFile
                name="photoURL"
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
                    {t('allowed')} *.jpeg, *.jpg, *.png, *.gif
                    <br /> {t('max_size_of')} {fData(3145728)}
                  </Typography>
                }
              />
              <Button variant="contained" type="submit">
                {t('Save')}
              </Button>
            </Stack>
          </FormProvider>
        </Paper>
      </Container>
    </Page>
  );
}
