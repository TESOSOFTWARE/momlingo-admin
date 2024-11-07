import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import { NewVariantForm } from './components/NewVariantForm';
import NewVariantHeader from './components/NewVariantHeader';

export default function NewIndex() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Thêm mới biến thể">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <NewVariantHeader />
        <NewVariantForm />
      </Container>
    </Page>
  );
}
