import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import RequestTableForm from '../../request-management/request-list/components/request-table/RequestTableForm';
import PopupListHeader from './components/PopupListHeader';
import PopupTableForm from './components/PopupTableForm';

export default function RequestList() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Danh sách popup">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <PopupListHeader />
        <PopupTableForm />
      </Container>
    </Page>
  );
}
