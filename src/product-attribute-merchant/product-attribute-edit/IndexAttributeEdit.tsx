import { Container } from '@mui/material';
import useSettings from '../../common/hooks/useSettings';
import AttributeFormEdit from './components/AttributeFormEdit';
import AttributeHeading from './components/AttributeHeading';
import Page from '../../common/components/Page';
import { useTranslation } from 'react-i18next';

export default function IndexAttributeEdit() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();

  return (
    <Page title={t('attribute.edit.titleEdit')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <AttributeHeading />
        <AttributeFormEdit />
      </Container>
    </Page>
  );
}
