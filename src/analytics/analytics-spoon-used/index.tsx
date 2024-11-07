import { Container, Button } from '@mui/material';
import i18n from 'src/common/locales/i18n';
import { useTranslation } from 'react-i18next';
import useSettings from '../../common/hooks/useSettings';
import Page from '../../common/components/Page';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import Iconify from '../../common/components/Iconify';
import useMessage from 'src/common/hooks/useMessage';
import { useExportSpoon } from './hooks/useExportSpoon';
import { useSelector } from 'react-redux';
import { searchDataSelector, setIsOpenConfirmModal } from './statisticSpoonUsed.slice';
import { IParamsStatisticSpoon } from './interfaces';
import ConfirmModalExport from './components/ConfirmModalExport';
import { dispatch } from '../../common/redux/store';
import SpoonUsedAnalyticsDashboard from './components/SpoonUsedAnalyticsDashboard';

export default function AnalycticsSpoon() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const searchParams = useSelector(searchDataSelector);

  const { mutate } = useExportSpoon({
    onSuccess: () => {
      showSuccessSnackbar(t('analystSpoonUsed.export.successExport'));
      dispatch(setIsOpenConfirmModal(true));
    },
    onError: () => showErrorSnackbar(t('analystSpoonUsed.export.failedExport')),
  });

  const handleRequestExport = () => {
    const newSearchParams: IParamsStatisticSpoon = {
      status: 'USED',
      startDate: searchParams.startDate === null ? undefined : searchParams.startDate,
      endDate: searchParams.endDate === null ? undefined : searchParams.endDate,
    };
    mutate(newSearchParams);
  };

  return (
    <Page title={t('analystSpoonUsed.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('analystSpoonUsed.title')}
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: t('statistic'),
              href: PATH_DASHBOARD.analyticsSpoonUsed.listChart,
            },
            {
              name: t('analystSpoonUsed.title'),
              href: '',
            },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              onClick={handleRequestExport}
            >
              {`${i18n.t('export')}`}
            </Button>
          }
        />
        <SpoonUsedAnalyticsDashboard />
        <ConfirmModalExport />
      </Container>
    </Page>
  );
}
