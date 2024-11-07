import Page from '../../common/components/Page';
import { Container } from '@mui/material';
import useSettings from '../../common/hooks/useSettings';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { useTranslation } from 'react-i18next';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import EditStoreForm from './components/EditStoreForm';

export default function StoreEdit() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();

  return (
    <Page title="Chỉnh sửa cửa hàng (bản đồ)">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={t('storeInMap.edit.title')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            { name: BREADCUMBS.LIST_STORE_IN_MAP, href: PATH_DASHBOARD.storeInMap.list },
            { name: BREADCUMBS.EDIT_STORE_IN_MAP },
          ]}
        />
        <EditStoreForm />
      </Container>
    </Page>
  );
}
