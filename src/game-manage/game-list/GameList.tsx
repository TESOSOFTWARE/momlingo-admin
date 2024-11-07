import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import RequestTableForm from '../../request-management/request-list/components/request-table/RequestTableForm';
import GameListHeader from './components/GameListHeader';
import GameTableForm from './components/GameTableForm';

export default function GameList() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Danh sách trò chơi">
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <GameListHeader />
        <GameTableForm />
      </Container>
    </Page>
  );
}
