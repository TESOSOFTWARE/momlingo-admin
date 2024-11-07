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
import { searchDataSelector, setIsOpenConfirmModal } from './statisticSpoonUnused.slice';
import { IParamsStatisticSpoon } from './interfaces';
import ConfirmModalExport from './components/ConfirmModalExport';
import { dispatch } from '../../common/redux/store';
import SpoonUnusedAnalyticsDashboard from './components/SpoonUnusedAnalyticsDashboard';

export default function AnalycticsSpoon() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const searchParams = useSelector(searchDataSelector);

  const { mutate } = useExportSpoon({
    onSuccess: () => {
      showSuccessSnackbar(t('analystSpoonUnused.export.successExport'));
      dispatch(setIsOpenConfirmModal(true));
    },
    onError: () => showErrorSnackbar(t('analystSpoonUnused.export.failedExport')),
  });

  const handleRequestExport = () => {
    const newSearchParams: IParamsStatisticSpoon = {
      startDate: searchParams.startDate === null ? undefined : searchParams.startDate,
      endDate: searchParams.endDate === null ? undefined : searchParams.endDate,
    };
    mutate(newSearchParams);
  };

  return (
    <Page title={t('analystSpoonUnused.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('analystSpoonUnused.title')}
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: t('statistic'),
              href: PATH_DASHBOARD.analyticsSpoonUnused.listChart,
            },
            {
              name: t('analystSpoonUnused.title'),
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
        <SpoonUnusedAnalyticsDashboard />
        <ConfirmModalExport />
      </Container>
    </Page>
  );
}
