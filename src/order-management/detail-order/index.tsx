import { Container } from '@mui/material';
import useSettings from '../../common/hooks/useSettings';
import DetailOrderForm from './components/DetailOrderForm';
import DetailOrderHeader from './components/DetailOrderHeader';
import Page from '../../common/components/Page';

export default function index() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Chi tiết đơn quà">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <DetailOrderHeader />
        <DetailOrderForm />
      </Container>
    </Page>
  );
}
