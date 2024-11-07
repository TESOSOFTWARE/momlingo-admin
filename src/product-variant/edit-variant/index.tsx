import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import { EditVariantForm } from './components/EditVariantForm';
import EditVariantHeader from './components/EditVariantHeader';

export default function index() {
  const { themeStretch } = useSettings();
  return (
    <Page title={'Sua-bien-the-san-pham'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <EditVariantHeader />
        <EditVariantForm />
      </Container>
    </Page>
  );
}
