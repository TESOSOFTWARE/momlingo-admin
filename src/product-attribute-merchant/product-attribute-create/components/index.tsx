import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { PostProductAttributeDashboard } from './PostProductAttribute';
// --------------------------------------------

export default function ManageListEvent() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  return (
    <Page title={t('attribute.new.titleNew')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <PostProductAttributeDashboard />
      </Container>
    </Page>
  );
}
