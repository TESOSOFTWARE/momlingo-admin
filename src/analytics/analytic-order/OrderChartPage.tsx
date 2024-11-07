import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import OrderHeader from './components/OrderHeader';
import OrderChart from './components/OrderChart';
import vn from '../../common/locales/vn';

export default function OrderChartPage() {
  const { themeStretch } = useSettings();
  return (
    <Page title={vn.chartManage.title.order}>
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <OrderHeader />
        <OrderChart />
      </Container>
    </Page>
  );
}
