import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import EditAgentForm from './components/EditAgentForm';
import EditAgentHeader from './components/EditAgentHeader';
import { useTranslation } from 'react-i18next';

export default function index() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();

  return (
    <Page title={t('manageAgent.edit.tittle')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <EditAgentHeader />
        <EditAgentForm />
      </Container>
    </Page>
  );
}
