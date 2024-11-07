import { Container, Button } from '@mui/material';
import Page from '../../common/components/Page';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import useSettings from '../../common/hooks/useSettings';
import i18n from 'src/common/locales/i18n';
import Iconify from '../../common/components/Iconify';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EditCategoryForm from './components/EditCategoryForm';

export default function EditCategories() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  return (
    <Page title={i18n.t('category.edit.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('category.edit.title')}
          links={[
            {
              name: `${i18n.t('category.list')}`,
              href: PATH_DASHBOARD.category.list,
            },
            {
              name: `${i18n.t('category.edit.title')}`,
              href: '',
            },
          ]}
        />
        <EditCategoryForm />
      </Container>
    </Page>
  );
}
