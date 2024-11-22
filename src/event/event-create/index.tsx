import { Container } from '@mui/material';
import i18n from 'src/common/locales/i18n';
import useSettings from '../../common/hooks/useSettings';
import Page from '../../common/components/Page';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import FormCreateEvent from './components/CreateEvent';

export default function CreateEvent() {
  const { themeStretch } = useSettings();
  return (
    <Page title={i18n.t('event.create')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('event.create')}
          links={[
            {
              name: `${i18n.t('event.title')}`,
              href: '',
            },
            {
              name: `${i18n.t('event.create')}`,
              href: '',
            },
          ]}
        />
        <FormCreateEvent />
      </Container>
    </Page>
  );
}
