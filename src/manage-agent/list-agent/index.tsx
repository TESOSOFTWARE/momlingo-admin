import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import ListAgentHeader from './components/ListAgentHeader';
import AgentTable from './components/table/AgentTable';
import { useTranslation } from 'react-i18next';

export default function index() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();

  return (
    <Page title={t('manageAgent.list.title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <ListAgentHeader />
        <AgentTable />
      </Container>
    </Page>
  );
}
