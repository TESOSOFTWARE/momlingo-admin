import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import NewStoreForm from './components/NewStoreForm';
import NewStoreHeader from './components/NewStoreHeader';

export default function StoreNew() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Thêm mới cửa hàng (bản đồ)">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <NewStoreHeader />
        <NewStoreForm />
      </Container>
    </Page>
  );
}
