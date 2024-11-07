import { Container } from '@mui/material';
import i18n from 'src/common/locales/i18n';
import useSettings from '../common/hooks/useSettings';
import Page from '../common/components/Page';
import HeaderBreadcrumbs from '../common/components/HeaderBreadcrumbs';
import { ListFileImportDashboard } from './components/FileImportDashboard';

export default function FileImport() {
  const { themeStretch } = useSettings();
  return (
    <Page title={i18n.t('fileList.importFileList')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('fileList.importFileList')}
          links={[
            {
              name: `${i18n.t('fileList.title')}`,
              href: '',
            },
            {
              name: `${i18n.t('fileList.importFileList')}`,
              href: '',
            },
          ]}
        />
        <ListFileImportDashboard />
      </Container>
    </Page>
  );
}
