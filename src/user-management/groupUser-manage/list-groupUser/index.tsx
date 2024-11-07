import { Container, Button } from '@mui/material';
import i18n from 'src/common/locales/i18n';
import useSettings from '../../../common/hooks/useSettings';
import Page from '../../../common/components/Page';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import GroupUserDashboard from './components/ListGroupUserDashboard';
import Iconify from '../../../common/components/Iconify';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function GroupUserManagement() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  return (
    <Page title={i18n.t('groupUser.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('groupUser.list')}
          links={[
            {
              name: `${i18n.t('groupUser.title')}`,
              href: '',
            },
            {
              name: `${i18n.t('groupUser.list')}`,
              href: '',
            },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              to={PATH_DASHBOARD.userManagement.createGroupUser}
              component={RouterLink}
            >
              {t('groupUser.create')}
            </Button>
          }
        />
        <GroupUserDashboard />
      </Container>
    </Page>
  );
}
