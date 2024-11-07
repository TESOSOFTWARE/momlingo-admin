import ConfigFeatureList from './components/config-feature-table/ConfigFeatureList';
import ConfigFeatureHeader from './components/ConfigFeatureHeader';
import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import i18n from 'src/common/locales/i18n';
import useSettings from '../../common/hooks/useSettings';

export default function ListConfigFeature() {
  const { themeStretch } = useSettings();
  return (
    <Page title={i18n.t('featureConfig.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ConfigFeatureHeader />
        <ConfigFeatureList />
      </Container>
    </Page>
  );
}
