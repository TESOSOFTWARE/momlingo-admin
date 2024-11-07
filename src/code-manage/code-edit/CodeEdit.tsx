import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import en from '../../common/locales/en';
import CodeEditForm from './components/CodeEditForm';
import CodeEditHeader from './components/CodeEditHeader';

export default function CodeEdit() {
  const { themeStretch } = useSettings();
  return (
    <Page title={en.titleEdit}>
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <CodeEditHeader />
        <CodeEditForm />
      </Container>
    </Page>
  );
}
