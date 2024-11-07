import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import DownloadListHeader from './components/DownloadListHeader';
import HistoryTableForm from './components/download-history-table/HistoryTableForm';
import vn from '../../common/locales/vn';

export default function DownloadHistoryList() {
  const { themeStretch } = useSettings();
  return (
    <Page title={vn.requestManagement.historyDownload.list}>
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <DownloadListHeader />
        <HistoryTableForm />
      </Container>
    </Page>
  );
}
