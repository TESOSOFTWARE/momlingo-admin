import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import Page from '../../../common/components/Page';
import useSettings from '../../../common/hooks/useSettings';
import { Stack, Button, Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import FormDetailUserSurvey from './components/DetailUserSurvey';
import { useNavigate, useParams } from 'react-router-dom';
import Iconify from '../../../common/components/Iconify';
import useMessage from 'src/common/hooks/useMessage';
import { useRequestExportUserDetail } from './hooks/useRequestExportUserDetail';
import { dispatch } from '../../../common/redux/store';
import { useEffect } from 'react';
import { setConfirmModal } from '../../common/survey.slice';

export default function ViewUserSurvey() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { surveyId, userId } = useParams();
  const { mutate, isSuccess } = useRequestExportUserDetail({
    onSuccess: () => showSuccessSnackbar(t('survey.action.export.sucess')),
    onError: () => showErrorSnackbar(t('survey.action.export.fail')),
  });
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setConfirmModal({
          isOpen: true,
          text: t('survey.action.export.redirectExportList'),
          callback: () => {
            navigate(PATH_DASHBOARD.fileManage.listFileExport);
          },
        })
      );
    }
  }, [isSuccess]);
  const handleRequestExport = () => {
    mutate({
      surveyUserId: parseInt(surveyId as string),
      surveyUserDetailId: parseInt(userId as string),
    });
  };
  return (
    <Page title={t('survey.userSurvey.header')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('survey.userSurvey.header')}
          links={[
            {
              name: t('survey.userSurvey.list'),
              href: '',
            },
            {
              name: t('survey.userSurvey.header'),
              href: '',
            },
          ]}
          action={
            <Stack direction={'row'} spacing={2}>
              <Button
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon={'ic:baseline-keyboard-arrow-left'} />}
                onClick={() =>
                  navigate(PATH_DASHBOARD.survey.view_user(parseInt(surveyId as string)))
                }
              >
                {t('survey.back')}
              </Button>
              <Button
                onClick={handleRequestExport}
                variant="contained"
                startIcon={<Iconify icon={'carbon:export'} />}
              >
                {t('survey.userSurvey.export')}
              </Button>
            </Stack>
          }
        />
        <FormDetailUserSurvey />
      </Container>
    </Page>
  );
}
