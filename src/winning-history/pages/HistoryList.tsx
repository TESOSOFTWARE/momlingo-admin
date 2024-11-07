import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import HistoryTable from '../components/history_list/HistoryTable';

export default function HistoryList() {
  return (
    <Page title="Events">
      <Container maxWidth="xl" disableGutters>
        <HistoryTable />
      </Container>
    </Page>
  );
}
