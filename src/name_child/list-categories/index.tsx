import { Button, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import i18n from 'src/common/locales/i18n';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Iconify from '../../common/components/Iconify';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import CategoryDashBoard from './components/CategoryDashBoard';

export default function CategoryManagement() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  return (
    <Page title={i18n.t('nameChild.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('nameChild.list')}
          links={[
            {
              name: `${i18n.t('nameChild.title')}`,
              href: '',
            },
            {
              name: `${i18n.t('nameChild.list')}`,
              href: '',
            },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              to={PATH_DASHBOARD.category.new}
              component={RouterLink}
            >
              {`${i18n.t('nameChild.add')}`}
            </Button>
          }
        />
        <CategoryDashBoard />
      </Container>
    </Page>
  );
}
