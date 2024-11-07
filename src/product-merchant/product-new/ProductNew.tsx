import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import ProductNewForm from './components/ProductNewForm';
import ProductNewHeader from './components/ProductNewHeader';
import { useTranslation } from 'react-i18next';

export default function ProductNew() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();

  return (
    <>
      <Page title={t('productMerchant.new.title')}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <ProductNewHeader />
          <ProductNewForm />
        </Container>
      </Page>
    </>
  );
}
