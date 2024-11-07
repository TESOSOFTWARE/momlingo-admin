import { Container, Button } from '@mui/material';
import i18n from 'src/common/locales/i18n';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useSettings from '../../common/hooks/useSettings';
import Page from '../../common/components/Page';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import Iconify from '../../common/components/Iconify';
import ScanAnalyticsDashboard from './components/ScanAnalyticsDashboard';
import { useRequestExport } from './hooks/useRequestExport';
import useMessage from '../../common/hooks/useMessage';
import { dispatch, useSelector } from '../../common/redux/store';
import ConfirmModalExport from './components/ConfirmModalExport';
import { setIsOpenConfirmModal } from './statisticScan.slice';

export default function AnalycticsScan() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { searchData, province } = useSelector((state) => state.statisticScan);
  const { mutate } = useRequestExport({
    onSuccess: () => {
      showSuccessSnackbar(t('survey.action.export.sucess'));
      dispatch(setIsOpenConfirmModal(true));
    },
    onError: () => showErrorSnackbar(t('survey.action.export.fail')),
  });

  const handleRequestExport = () => {
    province?.map((item) => {
      mutate({
        provinceId: item.id,
        startDate: searchData.startDate,
        endDate: searchData.endDate,
      });
    });
  };

  return (
    <Page title={t('analystScan.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('analystScan.title')}
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: t('analystScan.title'),
              href: '',
            },
          ]}
          action={
            <Button
              onClick={handleRequestExport}
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              {`${i18n.t('export')}`}
            </Button>
          }
        />
        <ScanAnalyticsDashboard />
        <ConfirmModalExport />
      </Container>
    </Page>
  );
}
