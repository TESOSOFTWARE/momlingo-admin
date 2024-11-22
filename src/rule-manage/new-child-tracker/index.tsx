import { Box, Button, Container } from '@mui/material';
import Page from '../../common/components/Page';
import i18n from 'src/common/locales/i18n';
import useSettings from '../../common/hooks/useSettings';
import { useParams } from 'react-router-dom';
import ConfigFeatureHeader from '../../config-off-checkout/config-feature-list/components/ConfigFeatureHeader';
import FormChildTracker from './ChildTrackerForm';
import { useGetBabyTrackerWeek } from '../hooks/getTrackerByWeek';

export default function NewChildTracker() {
  const { themeStretch } = useSettings();
  const { week } = useParams<{ week: string }>();
  const { data, isLoading, error } = useGetBabyTrackerWeek(week || ''); // Sử dụng hook để lấy dữ liệu

  return (
    <Page title={i18n.t('featureConfig.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ConfigFeatureHeader />
        <h2>New Child Tracker</h2>
        <Box>
          <FormChildTracker childTrackerData={data} />
        </Box>
      </Container>
    </Page>
  );
}
