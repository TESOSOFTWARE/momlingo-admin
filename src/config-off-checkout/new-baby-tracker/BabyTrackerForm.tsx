import * as React from 'react';
import TextField from '@mui/material/TextField';

import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { ISurVeyForm } from '../../survey/common/survey.interface';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaAddSurvey } from '../../survey/schema';
import { DEFAULT_ADD_SURVEY } from '../../survey/contanst';
import useMessage from '../../common/hooks/useMessage';
import { useSurveyCreate } from '../../survey/survey-create/hooks/useSurveyCreate';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { IStatus } from '../../game-manage/constants';
import { FormProvider, RHFSwitch, RHFTextField } from '../../common/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useUpdateBabyTracker } from '../config-feature-list/hooks/useUpdateBabyTracker';
import { UpdateBabyTrackerParams } from '../config-feature-list/baby-tracker-interface';



export default function NewBabyTracker() {
  const navigate = useNavigate();
  
  // init data
  const [week, setWeek] = React.useState('0');
  const [keyTakeaways, setKeyTakeaways] = React.useState('0');
  const [momThumbnail3DUrl, setMomThumbnail3DUrl] = React.useState( "https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png" ||'');
  const [momImage3DUrl, setMomImage3DUrl] = React.useState("0");
  const [symptoms, setSymptoms] = React.useState('0');
  const [thingsToAvoid, setThingsToAvoid] = React.useState('0');
  const [thingsTodo, setThingsTodo] = React.useState('0');
  const [high, setHigh] = React.useState('0');
  const [weight, setWeight] = React.useState('0');
  const [thumbnail3DUrl, setThumbnail3DUrl] = React.useState( '0' );
  const [image3DUrl, setImage3DUrl] = React.useState( "0" );
  const [symbolicImageUrl, setSymbolicImageUrl] = React.useState("https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png" || "");
  const [sizeShortDescription, setSizeShortDescription] = React.useState( '0'
  );
  const [babyOverallInfo, setBabyOverallInfo] = React.useState('0' );
  const [babySizeInfo, setBabySizeInfo] = React.useState('0' );
  
  // React.useEffect(() => {
    
  // }, []);
  const methods = useForm<ISurVeyForm>({
    resolver: yupResolver(schemaAddSurvey),
    defaultValues: DEFAULT_ADD_SURVEY, // Sử dụng dữ liệu truyền vào nếu có
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = methods;
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate } = useUpdateBabyTracker();

  const dataNewTracker = async () => {
    const dataNew = {
      keyTakeaways: keyTakeaways,
      thumbnail3DMom: momThumbnail3DUrl,
      image3DUrlMom: momImage3DUrl,
      symptoms: symptoms,
      thingsTodo: thingsTodo,
      thingsToAvoid: thingsToAvoid,
      weight: weight,
      high: high,
      thumbnail3DBaby: thumbnail3DUrl,
      image3DUrlBaby: image3DUrl,
      symbolicImage: sizeShortDescription,
      sizeShortDescription: sizeShortDescription,
      babyOverallInfo: babyOverallInfo,
      babySizeInfo: babySizeInfo
    }
    console.log('data :', dataNew);

  if (!week) {
    console.error('Tuần không hợp lệ.');
    return;
  }
  // const updateParams: UpdateBabyTrackerParams = {
  //   week,
  //   data: dataUpdate,
  // };
  // Gọi mutate với dữ liệu đã chuẩn bị
  //  mutate(updateParams);
  }
  return (
    <Stack spacing={3}>
      <FormProvider methods={methods} 
      // onSubmit={handleSubmit(onSubmit)}
      >
        <Card sx={{ padding: 2 }}>
          <Stack spacing={3}>
            {/* Hiển thị Tiêu đề */}
            <TextField
              id="outlined-basic"
              label="Tuần"
              variant="outlined"
              value={week} // Gán giá trị trực tiếp
              onChange={(e) => setWeek(e.target.value)} // Có thể thêm hàm xử lý sự kiện khi thay đổi giá trị
            />
            {/* Hiển thị Mô tả */}
            <TextField
              id="keyTakeaways"
              label="Khoá"
              variant="outlined"
              multiline={true}
              value={keyTakeaways}
              onChange={(e) => setKeyTakeaways(e.target.value)}
            />

            <Typography variant="h6">Thông tin thai nhi:</Typography>

            <TextField
              id="babyOverallInfo"
              label="Thông tin chung thai nhi"
              variant="outlined"
              multiline={true}
              value={babyOverallInfo}
              onChange={(e) => setBabyOverallInfo(e.target.value)}
            />

            <TextField
              id="babySizeInfo"
              label="Thông tin kích thước thai nhi"
              variant="outlined"
              multiline={true}
              value={babySizeInfo}
              onChange={(e) => setBabySizeInfo(e.target.value)}
            />

            <TextField
              id="high"
              label="Chiều cao (m)"
              variant="outlined"
              value={high}
              onChange={(e) => setHigh(e.target.value)}
            />

            <TextField
              id="weight"
              label="Cân nặng (kg)" 
              variant="outlined"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />

            <Box sx={{
              display:'grid',
              gridTemplateColumns: {
                xs: '1fr', 
                md: '1fr 1fr'
              },
              gap: 2 
            }}>
              <TextField
                id="image3DUrl"
                label="URL Hình ảnh 3D"
                variant="outlined"
                value={image3DUrl}
                onChange={(e) => setImage3DUrl(e.target.value)}
              />
              <Box
                sx={{
                  width: '100%',
                  height: 500, // Chiều cao của iframe, bạn có thể chỉnh sửa theo nhu cầu
                  border: 'none' // Loại bỏ viền của iframe
                }}
              >
                <iframe
                  src= {image3DUrl}
                  title="3D Baby View"
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  allowFullScreen 
                ></iframe>
              </Box>
            </Box>

            <TextField
              id="sizeShortDescription"
              label="Mô tả ngắn về kích thước"
              variant="outlined"
              value={sizeShortDescription}
              onChange={(e) => setSizeShortDescription(e.target.value)}
            />
            <Box
            sx={{
              display:'grid',
              gridTemplateColumns: {
                xs: '1fr', 
                md: '1fr 1fr'
              },
              gap: 2 
            }}>
              <TextField
                id="symbolicImageUrl"
                label="URL Hình ảnh tượng trưng"
                variant="outlined"
                value={symbolicImageUrl}
                onChange={(e) => setSymbolicImageUrl(e.target.value)}
              />
              <img src={symbolicImageUrl} width={'100%'} height={'300px'} alt='img tượng trưng'/>
            </Box>
            <Box
            sx={{
              display:'grid',
              gridTemplateColumns: {
                xs: '1fr', 
                md: '1fr 1fr'
              },
              gap: 2 
            }}>
              <TextField
                id="thumbnail3DUrl"
                label="URL Hình ảnh thu nhỏ 3D"
                variant="outlined"
                value={thumbnail3DUrl}
                onChange={(e) => setThumbnail3DUrl(e.target.value)}
              />
              <img src={thumbnail3DUrl} width={'100%'} height={'300px'} alt='URL Hình ảnh thu nhỏ 3D'/>
            </Box>
        
            {/* Hiển thị thông tin mẹ */}
            <Typography variant="h6">Thông tin mẹ:</Typography>
            <TextField
              id="symptoms"
              label="Dấu hiệu của mẹ"
              variant="outlined"
              multiline={true}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
            <TextField
              id="thingsToAvoid"
              label="Những điều cần tránh"
              variant="outlined"
              multiline={true}
              value={thingsToAvoid}
              onChange={(e) => setThingsToAvoid(e.target.value)}
            />
            <TextField
              id="thingsTodo"
              label="Những điều nên làm"
              variant="outlined"
              multiline={true}
              value={thingsTodo}
              onChange={(e) => setThingsTodo(e.target.value)}
            />
            <Box
            sx={{
              display:'grid',
              gridTemplateColumns: {
                xs: '1fr', 
                md: '1fr 1fr'
              },
              gap: 2 
            }}>
              <TextField
                id="momThumbnail3DUrl"
                label="URL Hình ảnh thu nhỏ 3D"
                variant="outlined"
                value={momImage3DUrl}
                onChange={(e) => setMomImage3DUrl(e.target.value)}
              />
              <Box
                sx={{
                  width: '100%',
                  height: 500, // Chiều cao của iframe, bạn có thể chỉnh sửa theo nhu cầu
                  border: 'none' // Loại bỏ viền của iframe
                }}
              >
                <iframe
                  src={momImage3DUrl}
                  title="3D Baby View"
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  allowFullScreen 
                ></iframe>
              </Box>
            </Box>
            <Box
            sx={{
              display:'grid',
              gridTemplateColumns: {
                xs: '1fr', 
                md: '1fr 1fr'
              },
              gap: 2 
            }}>
              <TextField
                id="momThumbnail3DUrl"
                label="URL Hình ảnh thu nhỏ 3D"
                variant="outlined"
                value={momThumbnail3DUrl}
                onChange={(e) => setThumbnail3DUrl(e.target.value)}
              />
              <img src={momThumbnail3DUrl} width={'100%'} height={'300px'} alt='URL Hình ảnh thu nhỏ 3D'/>
            </Box>
          </Stack>
        </Card>
        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
          {/* <Button
            color="inherit"
            size="medium"
            variant="contained"
            onClick={() => navigate(PATH_DASHBOARD.survey.list)}
          >
            Hủy bỏ
          </Button> */}
          <LoadingButton
            size="large"
            variant="contained"
            loading={isSubmitting}
            // type="submit"
            onClick={()=>dataNewTracker()}
          >
            Cập nhật
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
