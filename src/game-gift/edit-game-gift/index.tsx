import { Container } from '@mui/material';
import i18n from 'src/common/locales/i18n';
import useSettings from '../../common/hooks/useSettings';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Page from '../../common/components/Page';
import FormEditGameGift from './components/EditGameGift';

export default function EditGameGift() {
  const { themeStretch } = useSettings();
  return (
    <Page title={i18n.t('gameGifts.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('gameGifts.edit')}
          links={[
            {
              name: `${i18n.t('gameGifts.title')}`,
              href: '',
            },
            {
              name: `${i18n.t('gameGifts.edit')}`,
              href: '',
            },
          ]}
        />
        <FormEditGameGift />
      </Container>
    </Page>
  );
}
