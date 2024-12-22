// New Baby Tracker
import { Box, Container } from '@mui/material';
import i18n from 'src/common/locales/i18n';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import ConfigFeatureHeader from '../config-feature-list/components/ConfigFeatureHeader';
import NewBabyTracker from './BabyTrackerForm';

export default function NewBabyTrackerPage() {
  const { themeStretch } = useSettings();

  return (
    <Page title={i18n.t('featureConfig.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ConfigFeatureHeader />
        <h2>New Baby Tracker </h2>
        <Box>
          <NewBabyTracker />
          {/* <FormCreateSurvey/> */}
          {/* <Button onClick={handleUpdateData}>Update Baby Tracker</Button> */}
        </Box>
      </Container>
    </Page>
  );
}
