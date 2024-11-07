import { Container } from '@mui/material';
import i18n from 'src/common/locales/i18n';
import Page from '../common/components/Page';
import useSettings from '../common/hooks/useSettings';
import HeaderBreadcrumbs from '../common/components/HeaderBreadcrumbs';
import ListRuleDashBoard from './components/RuleDashboard';

export default function RuleManagement() {
  const { themeStretch } = useSettings();
  return (
    <Page title={i18n.t('ruleManage.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('ruleManage.list')}
          links={[
            {
              name: `${i18n.t('ruleManage.title')}`,
              href: '',
            },
            {
              name: `${i18n.t('ruleManage.list')}`,
              href: '',
            },
          ]}
        />
        <ListRuleDashBoard/>
      </Container>
    </Page>
  );
}
