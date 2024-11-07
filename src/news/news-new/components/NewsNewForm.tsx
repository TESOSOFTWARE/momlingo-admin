import { useNavigate } from 'react-router-dom';
import {
  FormProvider,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../../common/components/hook-form';
import {
  FormHelperText,
  Paper,
  Stack,
  MenuItem,
  FormLabel,
  Typography,
  Button,
  Autocomplete,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { usePresignImg } from '../../../common/hooks/usePresignImg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { statusNews } from '../constant';
import { IDataFormNews, ISubmitData } from '../interface';
import { useCallback, useEffect } from 'react';
import RHFMultipleSelect from '../../../common/components/hook-form/RHFMultipleSelect';
import { DEFAULT_VALUE_FORM_NEWS, subjectFilter } from '../../news-common/constant';
import { fData } from '../../../common/utils/formatNumber';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { useCreateNews } from '../hooks/useCreateNews';
import useMessage from '../../../common/hooks/useMessage';
import { RHFSelectPagitnationMultiple } from '../../../common/components/hook-form/RHFSelectPaginationMutiple';
import { getNewsSubject } from '../../news-common/service';
import { useGetSubject } from '../../hooks/useGetSubject';
import { schemaNews } from '../../news-common/schema';

function NewsNewForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleUpload } = usePresignImg();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const methods = useForm<ISubmitData>({
    resolver: yupResolver(schemaNews),
    defaultValues: DEFAULT_VALUE_FORM_NEWS,
  });
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const { mutate, isSuccess } = useCreateNews({
    onSuccess: () => {
      showSuccessSnackbar(t('news.new.newSuccess'));
      navigate(PATH_DASHBOARD.news.list);
    },
    onError: () => {
      showErrorSnackbar(t('news.new.newFail'));
    },
  });

  const { data: dataSubject, isLoading } = useGetSubject({
    page: undefined,
    limit: undefined,
  });

  const listSubject = dataSubject?.items || [];

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = async (data: ISubmitData) => {
    const file = await handleUpload(data?.image as File);
    const dataCreate: IDataFormNews = {
      subjectIds: data.subjectIds,
      status: data.status,
      thumbnailId: file.id,
      newsDetails: [
        {
          lang: 'VN',
          content: data.content,
          author: data.author,
          description: data.description,
        },
      ],
      title: data.title,
    };
    mutate(dataCreate);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={3}>
        <Paper elevation={3}>
          <Stack direction="column" spacing={3} padding={3}>
            <Stack direction="column" spacing={3}>
              <RHFTextField name="title" label={t('news.new.labelTitle')} />
              <Stack direction="row" spacing={3}>
                <RHFTextField name="author" label={t('news.new.author')} />
                <RHFSelect
                  name="status"
                  fullWidth
                  label={t('news.new.labelStatus')}
                  SelectProps={{ native: false }}
                >
                  {statusNews?.map((item) => (
                    <MenuItem value={item.value} key={item.key}>
                      {item.key}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Stack>
              <RHFMultipleSelect
                name="subjectIds"
                fullWidth
                label={t('news.list.labelSubject')}
                SelectProps={{ native: false, multiple: true }}
              >
                <MenuItem value="" disabled />
                {listSubject?.map((subject) => (
                  <MenuItem key={subject?.id} value={subject?.id}>
                    {subject?.subjectDetails[0]?.name}
                  </MenuItem>
                ))}
              </RHFMultipleSelect>

              <RHFTextField name="description" label={t('news.new.description')} />
            </Stack>
            <Stack spacing={1}>
              <Stack
                direction="row"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <FormLabel>{t('news.new.labelContent')}</FormLabel>
              </Stack>
              <RHFEditor name="content" />
            </Stack>
            <Stack spacing={1}>
              <FormLabel sx={{ marginLeft: 2, marginBottom: 1 }}>
                {t('news.new.labelImage')}
              </FormLabel>
              <RHFUploadSingleFile
                name="image"
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
                    {t('news.new.allow')} *.jpeg, *.jpg, *.png, *.gif
                    <br />
                    {t('news.new.maxSize')}: {fData(3145728)}
                  </Typography>
                }
              />
              {
                <FormHelperText
                  sx={{ color: 'red', paddingLeft: '17px', marginTop: '-10px' }}
                >
                  {errors?.image?.message}
                </FormHelperText>
              }
            </Stack>
          </Stack>
          <Stack justifyContent="flex-end" spacing={2} direction="row" sx={{ m: 3 }}>
            <LoadingButton
              variant="contained"
              size="large"
              type="submit"
              loading={isSubmitting}
            >
              {t('news.new.addBtn')}
            </LoadingButton>
            <Button
              color="inherit"
              variant="contained"
              size="large"
              onClick={() => navigate(PATH_DASHBOARD.news.list)}
            >
              {t('news.new.cancelBtn')}
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </FormProvider>
  );
}

export default NewsNewForm;
