import { Container } from '@mui/material';
import i18n from 'src/common/locales/i18n';
import useSettings from '../../common/hooks/useSettings';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Page from '../../common/components/Page';
import FormCreateGameGift from './components/CreateGameGiftForm';

export default function CreateGameGift() {
  const { themeStretch } = useSettings();
  return (
    <Page title={i18n.t('gameGifts.create')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('gameGifts.create')}
          links={[
            {
              name: `${i18n.t('gameGifts.title')}`,
              href: '',
            },
            {
              name: `${i18n.t('gameGifts.create')}`,
              href: '',
            },
          ]}
        />
        <FormCreateGameGift/>
      </Container>
    </Page>
  );
}
