import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { Stack, Button, Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import ListSurveys from './ListSurveys';
export default function EditSurvey() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Danh sách khảo sát">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ListSurveys />
      </Container>
    </Page>
  );
}
