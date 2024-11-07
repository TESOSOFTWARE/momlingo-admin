import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import vn from '../../common/locales/vn';
import ProductTable from './components/product-table/ProductTable';
import ProductHeader from './components/ProductHeader';

export default function ProductList() {
  const { themeStretch } = useSettings();

  return (
    <>
      <Page title={vn.ListProduct.title}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <ProductHeader />
          <ProductTable />
        </Container>
      </Page>
    </>
  );
}
