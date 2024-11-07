import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { Stack, Button, Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import FormEditSurvey from './components/EditSurveyForm';
export default function EditSurvey() {
  const { themeStretch } = useSettings();
  return (
    <Page title={BREADCUMBS.SURVEY_EDIT}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={BREADCUMBS.SURVEY_EDIT}
          links={[
            {
              name: BREADCUMBS.SURVEY_MANAGE,
              href: PATH_DASHBOARD.survey.list,
            },
            {
              name: BREADCUMBS.SURVEY_EDIT,
              href: '',
            },
          ]}
        />
        <FormEditSurvey />
      </Container>
    </Page>
  );
}
