import { Container } from '@mui/system';
import useSettings from '../../common/hooks/useSettings';
import EditOrderForm from './components/EditOrderForm';
import EditOrderHeader from './components/EditOrderHeader';
import Page from '../../common/components/Page';

export default function index() {
  const { themeStretch } = useSettings();
  return (
    <Page title={'Chỉnh sửa đơn quà'}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <EditOrderHeader />
        <EditOrderForm />
      </Container>
    </Page>
  );
}
