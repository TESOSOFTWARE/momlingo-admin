import { Container } from '@mui/material';
import useSettings from 'src/common/hooks/useSettings';
import ListPointHeader from './Components/ListPointHeader';
import PointTable from './Components/PointTable/PointTable';
import Page from '../../common/components/Page';
import vn from '../../common/locales/vn';

export default function index() {
  const { themeStretch } = useSettings();
  return (
    <Page title={vn.ConfigPoint.List.title}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <ListPointHeader />
        <PointTable />
      </Container>
    </Page>
  );
}
