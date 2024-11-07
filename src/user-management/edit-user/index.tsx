import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import useSettings from '../../common/hooks/useSettings';
import i18n from 'src/common/locales/i18n';
import FormEditUser from './components/EditUserForm';

export default function EditUser() {
  const { themeStretch } = useSettings();
  return (
    <Page title={i18n.t('userManage.editTitle')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('userManage.editTitle')}
          links={[
            {
              name: `${i18n.t('userManage.list')}`,
              href: PATH_DASHBOARD.userManagement.list,
            },
            {
              name: `${i18n.t('userManage.editTitle')}`,
              href: '',
            },
          ]}
        />
        <FormEditUser />
      </Container>
    </Page>
  );
}
