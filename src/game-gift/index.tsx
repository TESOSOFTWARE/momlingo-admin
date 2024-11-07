import { Container, Button } from '@mui/material';
import useSettings from '../common/hooks/useSettings';
import Page from '../common/components/Page';
import i18n from 'src/common/locales/i18n';
import HeaderBreadcrumbs from '../common/components/HeaderBreadcrumbs';
import ListGameGiftsDashBoard from './components/ListGameDashboard';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from '../common/routes/paths';
import Iconify from '../common/components/Iconify';

export default function GameGiftManagement() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {id: gameId} = useParams();
  return (
    <Page title={i18n.t('gameGifts.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={i18n.t('gameGifts.list')}
          links={[
            {
              name: `${i18n.t('gameGifts.title')}`,
              href: '',
            },
            {
              name: `${i18n.t('gameGifts.list')}`,
              href: '',
            },
          ]}
          action= {
            <Button
              variant="contained"
              onClick={() => navigate(PATH_DASHBOARD.gameGift.create(gameId as string))}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              {t('gameGifts.create')}
            </Button>
          }
        />
        <ListGameGiftsDashBoard/>
      </Container>
    </Page>
  );
}
