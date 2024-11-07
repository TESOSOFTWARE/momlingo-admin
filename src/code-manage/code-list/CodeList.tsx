import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import CodeTableForm from './components/code-table/CodeTableForm';
import CodeHeader from './components/CodeHeader';

export default function CodeList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Code: List">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <CodeHeader />
        <CodeTableForm />
      </Container>
    </Page>
  );
}
