import { Container, Button } from '@mui/material';
import Page from '../../common/components/Page';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import useSettings from '../../common/hooks/useSettings';
import i18n from 'src/common/locales/i18n';
import CategoryDashBoard from './components/CategoryDashBoard';
import Iconify from '../../common/components/Iconify';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CategoryManagement() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  return (
    <Page title={i18n.t('category.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('category.list')}
          links={[
            {
              name: `${i18n.t('category.title')}`,
              href: '',
            },
            {
              name: `${i18n.t('category.list')}`,
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
              {`${i18n.t('category.add')}`}
            </Button>
          }
        />
        <CategoryDashBoard />
      </Container>
    </Page>
  );
}
