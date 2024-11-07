import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import CodeCreateForm from './components/CodeCreateForm';
import CodeCreateHeader from './components/CodeCreateHeader';

export default function CodeCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Code: Create">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <CodeCreateHeader />
        <CodeCreateForm />
      </Container>
    </Page>
  );
}
