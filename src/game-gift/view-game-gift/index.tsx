import { Container } from '@mui/material';
import i18n from 'src/common/locales/i18n';
import useSettings from '../../common/hooks/useSettings';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Page from '../../common/components/Page';
import FormViewGameGift from './components/ViewGameGift';

export default function ViewGameGift() {
  const { themeStretch } = useSettings();
  return (
    <Page title={i18n.t('gameGifts.detail')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('gameGifts.detail')}
          links={[
            {
              name: `${i18n.t('gameGifts.list')}`,
              href: '',
            },
            {
              name: `${i18n.t('gameGifts.detail')}`,
              href: '',
            },
          ]}
        />
        <FormViewGameGift/>
      </Container>
    </Page>
  );
}
