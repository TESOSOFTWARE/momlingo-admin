import Page from '../../common/components/Page';
import { Container } from '@mui/material';
import GameWinHistoryTable from './components/game-win-history-table/GameWinHistoryTable';

function GameWinHistory() {
  return (
    <>
      <Page title="Danh sách user trúng giải">
        <Container maxWidth="xl" disableGutters>
          <GameWinHistoryTable />
        </Container>
      </Page>
    </>
  );
}

export default GameWinHistory;
