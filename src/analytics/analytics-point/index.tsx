import { Container, Button,Stack } from '@mui/material';
import i18n from 'src/common/locales/i18n';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useSettings from '../../common/hooks/useSettings';
import Page from '../../common/components/Page';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import Iconify from '../../common/components/Iconify';
import PointAnalyticsDashboard from './components/PointAnalyticsDashboard';
import { dispatch, useSelector } from '../../common/redux/store';
import { closeConfirmModal, setConfirmModal } from '../slice';
import { useEffect } from 'react';
import { useRequestExport } from './hooks/useRequestExport';
import useMessage from 'src/common/hooks/useMessage';
import { ConfirmModal } from '../../common/components/modal/ConfirmModal';
import { searchDataSelector } from './statisticPoint.slice';

export default function AnalycticsPoint() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();

  const navigate = useNavigate();


  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { confirmModal } = useSelector((state) => state.chart);
  const searchData = useSelector(searchDataSelector);

  const handleCloseDeleteModal = () => {
    dispatch(closeConfirmModal());
  };
  const { mutate, isSuccess } = useRequestExport(
    {
      onSuccess: () => showSuccessSnackbar(t('survey.action.export.sucess')),
      onError: () => showErrorSnackbar(t('survey.action.export.fail')),
    })
  const handleRequestExport = () => {
    mutate(searchData)
  }
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setConfirmModal({
          isOpen: true,
          text: t('survey.action.export.redirectExportList'),
          callback: () => {
            navigate(PATH_DASHBOARD.fileManage.listFileExport)
          },
        })
      );
    }

  }, [isSuccess])
  return (
    <Page title={t('analystPoint.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('analystPoint.title')}
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: t('analystPoint.title'),
              href: '',
            },
          ]}
          action={
            <Stack direction={'row'} spacing={2}>
              <Button variant="contained" onClick={handleRequestExport} startIcon={<Iconify icon={'carbon:export'} />}>
                {t('feedbackManage.export')}
              </Button>
            </Stack>
          }
        />
         <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={handleCloseDeleteModal}
        onSubmit={confirmModal.callback}
        type={'warning'}
        text={confirmModal.text}
      />
        <PointAnalyticsDashboard />
      </Container>
    </Page>
  );
}
