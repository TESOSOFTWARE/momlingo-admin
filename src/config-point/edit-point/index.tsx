import { Container } from '@mui/material';
import useSettings from '../../common/hooks/useSettings';
import EditPointForm from './components/EditPointForm';
import EditPointHeader from './components/EditPointHeader';
import Page from '../../common/components/Page';
import vn from '../../common/locales/vn';

export default function index() {
  const { themeStretch } = useSettings();
  return (
    <Page title={vn.ConfigPoint.Edit.title}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <EditPointHeader />
        <EditPointForm />
      </Container>
    </Page>
  );
}
