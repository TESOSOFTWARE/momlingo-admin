import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import ListUsersSurvey from './ListUsersSurvey';
export default function EditSurvey() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Danh sách nguời tham gia">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ListUsersSurvey />
      </Container>
    </Page>
  );
}
