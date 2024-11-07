import { Container } from '@mui/material';
import i18n from 'src/common/locales/i18n';
import useSettings from '../../common/hooks/useSettings';
import Page from '../../common/components/Page';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import FormEditEvent from './components/EditEvent';

export default function EditEvent() {
  const { themeStretch } = useSettings();
  return (
    <Page title={i18n.t('event.edit')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('event.edit')}
          links={[
            {
              name: `${i18n.t('event.title')}`,
              href: '',
            },
            {
              name: `${i18n.t('event.edit')}`,
              href: '',
            },
          ]}
        />
        <FormEditEvent/>
      </Container>
    </Page>
  );
}
