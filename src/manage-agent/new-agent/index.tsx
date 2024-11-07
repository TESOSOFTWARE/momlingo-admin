import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import NewAgentForm from './components/NewAgentForm';
import NewAgentHeader from './components/NewAgentHeader';
import { useTranslation } from 'react-i18next';

export default function index() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();

  return (
    <Page title={t('manageAgent.new.title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <NewAgentHeader />
        <NewAgentForm />
      </Container>
    </Page>
  );
}
