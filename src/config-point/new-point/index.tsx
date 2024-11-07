import { Container } from '@mui/material';
import useSettings from 'src/common/hooks/useSettings';
import NewPointForm from './components/NewPointForm';
import NewPointHeader from './components/NewPointHeader';
import Page from '../../common/components/Page';
import vn from '../../common/locales/vn';

export default function index() {
  const { themeStretch } = useSettings();
  return (
    <Page title={vn.ConfigPoint.New.title}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <NewPointHeader />
        <NewPointForm />
      </Container>
    </Page>
  );
}
