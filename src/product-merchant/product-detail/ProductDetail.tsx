import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import DetailHeader from './components/DetailHeader';
import ProductDetailForm from './components/ProductDetailForm';
import vn from '../../common/locales/vn';

export default function ProductDetail() {
  const { themeStretch } = useSettings();

  return (
    <>
      <Page title={vn.DetailProduct.title}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <DetailHeader />
          <ProductDetailForm />
        </Container>
      </Page>
    </>
  );
}
