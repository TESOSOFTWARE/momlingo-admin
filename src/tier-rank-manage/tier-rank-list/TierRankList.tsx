import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import RequestTableForm from '../../request-management/request-list/components/request-table/RequestTableForm';
import TierRankListHeader from './components/TierRankListHeader';
import TierRankTableForm from './components/TierRankTableForm';

export default function TierRankList() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Danh sách thứ hạng">
      <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
        <TierRankListHeader />
        <TierRankTableForm />
      </Container>
    </Page>
  );
}
