import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { Stack, Button, Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import GroupPolicyForm from './components/GroupPolicyForm';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import { useTranslation } from 'react-i18next';
export default function CreateGroupPolicy() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  return (
    <Page title={t('group_policy.create.root')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={t('group_policy.create.root')}
          links={[
            {
              name: t('group_policy.root'),
              href: PATH_DASHBOARD.groupPolicy.list,
            },
            {
              name: t('group_policy.create.root'),
              href: PATH_DASHBOARD.groupPolicy.create,
            },
          ]}
        />
        <GroupPolicyForm />
      </Container>
    </Page>
  );
}
