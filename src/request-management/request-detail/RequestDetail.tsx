import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import RequestDetailForm from './components/RequestDetailForm';

export default function RequestDetail() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Chi tiết yêu cầu">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <RequestDetailForm />
      </Container>
    </Page>
  );
}
