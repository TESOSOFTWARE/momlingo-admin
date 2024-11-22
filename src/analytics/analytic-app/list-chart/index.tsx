import { Container, Button } from '@mui/material';
import i18n from 'src/common/locales/i18n';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Page from '../../../common/components/Page';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import useSettings from '../../../common/hooks/useSettings';
import Iconify from '../../../common/components/Iconify';
import AppAnalyticsDashboard from './components/AppAnalyticsDashboard';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function AnalycticsAppList() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  return (
    <Page title={'Thống kê App'}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={'Các biểu đồ thống kê App'}
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
          ]}
          action={
            <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
              {`${i18n.t('export')}`}
            </Button>
          }
        />
        <AppAnalyticsDashboard />
      </Container>
    </Page>
  );
}
