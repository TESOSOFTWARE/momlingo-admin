import { Container, Button } from '@mui/material';
import i18n from 'src/common/locales/i18n';
import useSettings from '../../../common/hooks/useSettings';
import Page from '../../../common/components/Page';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import Iconify from '../../../common/components/Iconify';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FormEditGroupUser from './components/EditGroupUserForm';

export default function EditGroupUser() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  return (
    <Page title={i18n.t('groupUser.edit')}>
      <Container maxWidth={'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('groupUser.edit')}
          links={[
            {
              name: `${i18n.t('groupUser.list')}`,
              href: '',
            },
            {
              name: `${i18n.t('groupUser.edit')}`,
              href: '',
            },
          ]}
        />
        <FormEditGroupUser />
      </Container>
    </Page>
  );
}
