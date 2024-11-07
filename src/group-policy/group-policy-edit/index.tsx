import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import GroupPolicyEditForm from './components/GroupPolicyEditForm';
export default function CreateGroupPolicy() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  return (
    <Page title={t('group_policy.edit.root')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('group_policy.edit.root')}
          links={[
            {
              name: t('group_policy.root'),
              href: PATH_DASHBOARD.groupPolicy.list,
            },
            {
              name: t('group_policy.edit.root'),
            },
          ]}
        />
        <GroupPolicyEditForm />
      </Container>
    </Page>
  );
}
