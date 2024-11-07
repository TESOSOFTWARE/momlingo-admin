import { Container } from '@mui/material';
import useSettings from '../../common/hooks/useSettings';
import OrderForm from './components/OrderForm';
import OrderHeader from './components/OrderHeader';
import Page from '../../common/components/Page';

export default function IndexListOrder() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Danh sách đơn quà E-voucher">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <OrderHeader />
        <OrderForm />
      </Container>
    </Page>
  );
}
