
import { Box, Button, Container } from '@mui/material';
import Page from '../../common/components/Page';
import i18n from 'src/common/locales/i18n';
import useSettings from '../../common/hooks/useSettings';
import ConfigFeatureHeader from '../config-feature-list/components/ConfigFeatureHeader';
import { useParams } from 'react-router-dom';
import { useUpdateBabyTracker } from '../config-feature-list/hooks/useUpdateBabyTracker';
import { useGetBabyTrackerWeek } from '../config-feature-list/hooks/getTrackerByWeek';
import FormCreateSurvey from './BabyTrackerForm';

export default function EditBabyTracker() {
  const { themeStretch } = useSettings();
  // const { week } = useParams();
  const { week } = useParams<{ week: string }>();
  const { mutate } = useUpdateBabyTracker(); // Gọi mutation hook

  const { data, isLoading, error } = useGetBabyTrackerWeek(week || ''); // Sử dụng hook để lấy dữ liệu
   

  const handleUpdateData = () => {
    if (!week) {
      console.error('Week is required');
      return; // Nếu `week` không tồn tại, dừng lại và không thực hiện mutate
    }
    // const data = {
    //   keyTakeaways: 'Trọng tâm tuần này',
    //   thumbnail3DMom: 'base64-image-data',
    //   image3DUrlMom: 'http://link-to-3d-mom-image',
    //   symptoms: 'Triệu chứng mẹ',
    //   thingsTodo: 'Những việc mẹ nên làm',
    //   thingsToAvoid: 'Những việc mẹ nên tránh',
    //   weight: 500, // trọng lượng của mẹ (gam)
    //   high: 150, // chiều cao của mẹ (cm)
    //   thumbnail3DBaby: 'base64-image-data',
    //   image3DUrlBaby: 'http://link-to-3d-baby-image',
    //   symbolicImage: 'base64-image-data',
    //   sizeShortDescription: 'Mô tả kích thước em bé',
    //   babyOverallInfo: 'Thông tin tổng quan về em bé',
    //   babySizeInfo: 'Thông tin về kích thước em bé',
    // };

    // mutate({ week, data }); // Gọi mutation và truyền `week` và `data` vào
  };
  return (
    <Page title={i18n.t('featureConfig.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ConfigFeatureHeader />
          <h2>Edit Baby Tracker - Week {week}</h2>
          <Box>
            {/* <FormCreateSurvey/> */}
            <FormCreateSurvey babyTrackerData={data} />
            {/* <Button onClick={handleUpdateData}>Update Baby Tracker</Button> */}
          </Box>
      </Container>
    </Page>
  );
}
