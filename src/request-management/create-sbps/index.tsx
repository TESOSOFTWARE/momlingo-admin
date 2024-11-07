import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import useSettings from '../../common/hooks/useSettings';
import FormCreateSBPSCode from './components/FormCreateSBPS';
import i18n from 'src/common/locales/i18n';

export default function CreateSPBCode() {
  const { themeStretch } = useSettings();
  return (
    <Page title={i18n.t('requestManagement.createSBPS')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={i18n.t('requestManagement.createSBPS')}
          links={[
            {
              name: `${i18n.t('requestManagement.list')}`,
              href: PATH_DASHBOARD.requestManage.list,
            },
            {
              name: `${i18n.t('requestManagement.createSBPS')}`,
              href: '',
            },
          ]}
        />
        <FormCreateSBPSCode />
      </Container>
    </Page>
  );
}
