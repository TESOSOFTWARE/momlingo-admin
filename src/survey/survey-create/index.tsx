import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { Stack, Button, Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import FormCreateSurvey from './components/CreateSurveyForm';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
export default function CreateSurvey() {
  const { themeStretch } = useSettings();
  return (
    <Page title={BREADCUMBS.SURVEY_CREATE}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={BREADCUMBS.SURVEY_CREATE}
          links={[
            {
              name: BREADCUMBS.SURVEY_MANAGE,
              href: PATH_DASHBOARD.survey.list,
            },
            {
              name: BREADCUMBS.SURVEY_CREATE,
              href: PATH_DASHBOARD.survey.create,
            },
          ]}
        />
        <FormCreateSurvey />
      </Container>
    </Page>
  );
}
