import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import FeedbackListHeader from './components/FeedbackListHeader';
import FeedbackTableForm from './components/FeedbackTableForm';

export default function FeedbackList() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Danh sách góp ý">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <FeedbackListHeader />
        <FeedbackTableForm />
      </Container>
    </Page>
  );
}
