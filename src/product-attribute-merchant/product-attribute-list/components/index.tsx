import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import vn from '../../../common/locales/vn';
import { ProductAttributeList } from './ProductAttributeList';
// --------------------------------------------

export default function ManageListEvent() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  return (
    <Page title={t('attribute.list.titleList')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <ProductAttributeList />
      </Container>
    </Page>
  );
}
