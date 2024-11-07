import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Paper, Stack, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import useMessage from '../../../common/hooks/useMessage';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import { IFormEditSubject, IDataEditSubject } from '../interface';
import { SubjectSchema } from '../../subject-common/schema/schema';
import { DEFAULT_VALUE_EDIT_FORM } from '../constant';
import { useGetSubjectById } from '../hooks/useGetSubjectById';
import { useEditSubject } from '../hooks/useEditSubject';
import { SelectLang } from '../../subject-common/constant';

export default function EditSubjectForm() {
  const { useDeepCompareEffect } = useDeepEffect();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const methods = useForm<IFormEditSubject>({
    resolver: yupResolver(SubjectSchema),
    defaultValues: DEFAULT_VALUE_EDIT_FORM,
  });
  const { handleSubmit, reset, setValue, watch } = methods;
  const { id: subjectId } = useParams();

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isLoading } = useEditSubject({
    onSuccess: () => {
      showSuccessSnackbar(t('news_subject.edit.editSuccess'));
      navigate(PATH_DASHBOARD.news_subject.list);
    },
    onError: () => showErrorSnackbar(t('news_subject.edit.editFail')),
  });
  const { data: dataSubjectById } = useGetSubjectById(parseInt(subjectId as string));

  useDeepCompareEffect(() => {
    if (dataSubjectById) {
      const dataVN = {
        lang: dataSubjectById?.subjectDetails[0]?.lang,
        name: dataSubjectById?.subjectDetails[0]?.name,
      };
      reset(dataVN);
    }
  }, [dataSubjectById]);

  const onSubmit = (data: IFormEditSubject) => {
    const editData: IDataEditSubject = {
      id: parseInt(subjectId as string),
      subjectDetails: [
        {
          id: dataSubjectById?.subjectDetails[0]?.id,
          lang: dataSubjectById?.subjectDetails[0]?.lang,
          name: data?.name,
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
            <Box sx={{ display: 'none' }}>
              <RHFSelect name="lang" label={t('news_subject.edit.lang')}>
                {<option></option>}
                {SelectLang.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.label}
                  </option>
                ))}
              </RHFSelect>
            </Box>
            <RHFTextField name="name" label={t('news_subject.edit.labelName')} />
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
              navigate(PATH_DASHBOARD.news_subject.list);
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
