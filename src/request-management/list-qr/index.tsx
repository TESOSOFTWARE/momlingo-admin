import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import useSettings from '../../common/hooks/useSettings';
import { getProductGroup } from '../services';
import { IParamsRequest } from '../interfaces';
import { useGetListProductGroup } from '../hooks/useGetListProductGroup';
import i18n from 'src/common/locales/i18n';
import ListQRCodeDashboard from './components/ListQRCode';

export default function ListQRCode() {
  const { themeStretch } = useSettings();
  return (
    <Page title={i18n.t('requestManagement.listQR')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={i18n.t('requestManagement.listQR')}
          links={[
            {
              name: `${i18n.t('requestManagement.list')}`,
              href: PATH_DASHBOARD.requestManage.list,
            },
            {
              name: `${i18n.t('requestManagement.listQR')}`,
              href: '',
            },
          ]}
        />
        <ListQRCodeDashboard />
      </Container>
    </Page>
  );
}