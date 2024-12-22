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
    <Page title="Quản lý âm nhạc">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Quản lý âm nhạc"
          links={[
            {
              name: `Quản lý âm nhạc`,
              href: '',
            },
            {
              name: `Danh sách âm nhạc`,
              href: '',
            },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              to={PATH_DASHBOARD.musicTool.new}
              component={RouterLink}
            >
              Thêm mới
            </Button>
          }
        />
        <CategoryDashBoard />
      </Container>
    </Page>
  );
}
