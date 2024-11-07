import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import ProductEditForm from './components/ProductEditForm';
import ProductEditHeader from './components/ProductEditHeader';
import en from '../../common/locales/en';

export default function ProductEdit() {
  const { themeStretch } = useSettings();

  return (
    <>
      <Page title={en.EditProduct.title}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <ProductEditHeader />
          <ProductEditForm />
        </Container>
      </Page>
    </>
  );
}
