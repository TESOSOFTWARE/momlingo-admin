import { Container, Button } from '@mui/material';
import useSettings from '../common/hooks/useSettings';
import { useTranslation } from 'react-i18next';
import Page from '../common/components/Page';
import HeaderBreadcrumbs from '../common/components/HeaderBreadcrumbs';
import ConfigAppDashBoard from './components/ConfigAppDashboard';

export default function ConfigApp() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  return (
    <Page title={t('configApp.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('configApp.list')}
          links={[
            {
              name: `${t('configApp.title')}`,
              href: '',
            },
            {
              name: `${t('configApp.list')}`,
              href: '',
            },
          ]}
        />
        <ConfigAppDashBoard />
      </Container>
    </Page>
  );
}
  