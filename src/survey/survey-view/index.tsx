import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { Stack, Button, Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import FormViewSurvey from './components/ViewSurveyForm';
import { useTranslation } from 'react-i18next';

export default function ViewSurvey() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  return (
    <Page title={t('survey.view')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('survey.view')}
          links={[
            {
              name: t('survey.list'),
              href: PATH_DASHBOARD.survey.list,
            },
            {
              name: t('survey.view'),
              href: '',
            },
          ]}
        />
        <FormViewSurvey />
      </Container>
    </Page>
  );
}
