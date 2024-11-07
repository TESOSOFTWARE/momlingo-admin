import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Paper, Stack, debounce } from '@mui/material';
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
import { IDataNewSubject, ISubmitData } from '../interface';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { SelectLang } from '../../subject-common/constant';
import { SubjectSchema } from '../../subject-common/schema/schema';
import { useCreateSubject } from '../hooks/useCreateSubject';

export default function NewSubjectForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const methods = useForm<ISubmitData>({ resolver: yupResolver(SubjectSchema) });
  const { handleSubmit, watch, setValue } = methods;

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isLoading } = useCreateSubject({
    onSuccess: () => {
      showSuccessSnackbar(t('news_subject.new.newSuccess'));
      navigate(PATH_DASHBOARD.news_subject.list);
    },
    onError: () => showErrorSnackbar(t('news_subject.new.newFail')),
  });
  const onSubmit = (data: ISubmitData) => {
    const newData: IDataNewSubject = {
      subjectDetails: [
        {
          lang: 'VN',
          name: data.name,
        },
      ],
    };
    console.log(newData);
    mutate(newData);
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Stack spacing={3}>
            <Box sx={{ display: 'none' }}>
              <RHFSelect name="lang" label={t('news_subject.new.lang')}>
                {<option></option>}
                {SelectLang.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.label}
                  </option>
                ))}
              </RHFSelect>
            </Box>
            <RHFTextField name="name" label={t('news_subject.new.labelName')} />
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
              navigate(PATH_DASHBOARD.news_subject.list);
            }}
          >
            {t('cancel')}
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
}
