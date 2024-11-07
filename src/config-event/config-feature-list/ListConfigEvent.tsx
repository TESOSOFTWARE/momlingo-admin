import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import i18n from 'src/common/locales/i18n';
import useSettings from '../../common/hooks/useSettings';
import ConfigEventList from './components/config-event-table/ConfigEventList';
import ConfigEventHeader from './components/ConfigEventHeader';

export default function ListConfigEvent() {
  const { themeStretch } = useSettings();
  return (
    <Page title={i18n.t('configEvent.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ConfigEventHeader />
        <ConfigEventList />
      </Container>
    </Page>
  );
}
