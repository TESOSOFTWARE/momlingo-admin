import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import ListVariantHeader from './components/ListVariantHeader';
import VariantTable from './components/product-table/VariantTable';

export default function ListVariant() {
  const { themeStretch } = useSettings();
  return (
    <Page title={'Danh sách biến thể'}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ListVariantHeader />
        <VariantTable />
      </Container>
    </Page>
  );
}
