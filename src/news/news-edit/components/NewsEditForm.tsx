import { useNavigate, useParams } from 'react-router-dom';
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
import { useCallback, useEffect } from 'react';
import { fData } from '../../../common/utils/formatNumber';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import useMessage from '../../../common/hooks/useMessage';
import { statusNews } from '../../news-new/constant';
import { ISubmitData } from '../../news-new/interface';
import { IDataFormEditNews } from '../interface';
import { useGetNewsById } from '../hooks/useGetNewsById';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import { useEditNews } from '../hooks/useEditNews';
import { useGetSubject } from '../../hooks/useGetSubject';
import RHFMultipleSelect from '../../../common/components/hook-form/RHFMultipleSelect';
import { DEFAULT_VALUE_FORM_NEWS } from '../../news-common/constant';
import { schemaNews } from '../../news-common/schema';
import { CustomFile } from '../../../common/components/upload';

function NewsEditForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const methods = useForm<ISubmitData>({
    resolver: yupResolver(schemaNews),
    defaultValues: DEFAULT_VALUE_FORM_NEWS,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = methods;

  const { useDeepCompareEffect } = useDeepEffect();

  const params = useParams();
  const { handleUpload } = usePresignImg();
  const idDetail = params?.id;
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { data: detailNews } = useGetNewsById(parseInt(idDetail as string));

  const { mutate, isSuccess } = useEditNews({
    onSuccess: () => {
      showSuccessSnackbar(t('news.edit.newSuccess'));
      navigate(PATH_DASHBOARD.news.list);
    },
    onError: () => {
      showErrorSnackbar(t('news.edit.newFail'));
    },
  });

  const { data: dataSubject } = useGetSubject({
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

  useDeepCompareEffect(() => {
    if (detailNews) {
      reset({
        title: detailNews?.title,
        status: detailNews?.status,
        image: detailNews?.thumbnail?.url,
        subjectIds: detailNews?.subject?.map((subject) => subject?.id),
        content: detailNews?.newsDetails[0]?.content,
        description: detailNews?.newsDetails[0]?.description,
        author: detailNews?.newsDetails[0]?.author,
      });
    }
  }, [detailNews]);

  const onSubmit = async (data: ISubmitData) => {
    let imgId = detailNews?.thumbnail?.id;
    if (typeof data?.image !== 'string') {
      const file = await handleUpload(data.image as File);
      imgId = file?.id;
    }
    const dataEdit: IDataFormEditNews = {
      id: parseInt(idDetail as string),
      subjectIds: data.subjectIds,
      status: data.status,
      thumbnailId: imgId as number,
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
    mutate(dataEdit);
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
                <FormLabel sx={{ marginLeft: 2, marginBottom: 1 }}>
                  {t('news.edit.labelContent')}
                </FormLabel>
              </Stack>
              <RHFEditor name="content" />
            </Stack>
            <Stack spacing={1}>
              <FormLabel sx={{ marginLeft: 2, marginBottom: 1 }}>
                {t('news.edit.labelImage')}
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
                    {t('news.edit.allow')} *.jpeg, *.jpg, *.png, *.gif
                    <br />
                    {t('news.edit.maxSize')}: {fData(3145728)}
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
              {t('news.edit.editBtn')}
            </LoadingButton>
            <Button
              color="inherit"
              variant="contained"
              size="large"
              onClick={() => navigate(PATH_DASHBOARD.news.list)}
            >
              {t('news.edit.cancelBtn')}
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </FormProvider>
  );
}

export default NewsEditForm;
