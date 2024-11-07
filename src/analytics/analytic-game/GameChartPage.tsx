import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import GameHeader from './components/GameHeader';
import FeedbackTableForm from './components/GameChart';

export default function GameChartPage() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Thống kế trò chơi">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <GameHeader />
        <FeedbackTableForm />
      </Container>
    </Page>
  );
}
