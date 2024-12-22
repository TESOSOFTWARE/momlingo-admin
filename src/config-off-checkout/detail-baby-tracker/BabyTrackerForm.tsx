import TextField from '@mui/material/TextField';
import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormProvider } from '../../common/components/hook-form';
import useMessage from '../../common/hooks/useMessage';
import { ISurVeyForm } from '../../survey/common/survey.interface';
import { DEFAULT_ADD_SURVEY } from '../../survey/contanst';
import { schemaAddSurvey } from '../../survey/schema';
import { UpdateBabyTrackerParams } from '../config-feature-list/baby-tracker-interface';
import { useUpdateBabyTracker } from '../config-feature-list/hooks/useUpdateBabyTracker';
import { convertImageToBinaryString } from '../utils/convert';

// Sửa lại để nhận data từ parent
interface FormCreateSurveyProps {
  babyTrackerData?: any; // Thông tin dữ liệu truyền từ parent
}

export default function FormCreateSurvey({ babyTrackerData }: FormCreateSurveyProps) {
  // init data
  const [idTracker, setIdTracker] = React.useState(babyTrackerData?.id || '0');

  const [week, setWeek] = React.useState(babyTrackerData?.week || '0');
  const [keyTakeaways, setKeyTakeaways] = React.useState(
    babyTrackerData?.keyTakeaways || '0'
  );
  const [babyOverallInfo, setBabyOverallInfo] = React.useState(
    babyTrackerData?.babyInfo?.babyOverallInfo || '0'
  );
  const [babySizeInfo, setBabySizeInfo] = React.useState(
    babyTrackerData?.babyInfo?.babySizeInfo || '0'
  );
  const [high, setHigh] = React.useState(babyTrackerData?.babyInfo?.high || '0');
  const [weight, setWeight] = React.useState(babyTrackerData?.babyInfo?.weight || '0');
  const [babyId, setBabyId] = React.useState(babyTrackerData?.babyInfo?.id || '0');
  const [image3DUrl, setImage3DUrl] = React.useState(
    babyTrackerData?.babyInfo?.image3DUrl || '0'
  );
  const [sizeShortDescription, setSizeShortDescription] = React.useState(
    babyTrackerData?.babyInfo?.sizeShortDescription || '0'
  );
  const [symbolicImageUrl, setSymbolicImageUrl] = React.useState(
    babyTrackerData?.babyInfo?.symbolicImageUrl || ''
  );
  const [thumbnail3DUrl, setThumbnail3DUrl] = React.useState(
    babyTrackerData?.babyInfo?.thumbnail3DUrl || '0'
  );

  // info mommy
  const [idMom, setIdMom] = React.useState(babyTrackerData?.momInfo?.id || '0');
  const [momImage3DUrl, setMomImage3DUrl] = React.useState(
    babyTrackerData?.momInfo?.momImage3DUrl || '0'
  );
  const [symptoms, setSymptoms] = React.useState(
    babyTrackerData?.momInfo?.symptoms || '0'
  );
  const [thingsToAvoid, setThingsToAvoid] = React.useState(
    babyTrackerData?.momInfo?.thingsToAvoid || '0'
  );
  const [thingsTodo, setThingsTodo] = React.useState(
    babyTrackerData?.momInfo?.thingsTodo || '0'
  );
  const [momThumbnail3DUrl, setMomThumbnail3DUrl] = React.useState(
    babyTrackerData?.momInfo?.thumbnail3DUrl || '0'
  );

  React.useEffect(() => {
    if (babyTrackerData) {
      setWeek(babyTrackerData?.week);
      setIdTracker(babyTrackerData?.id);
      setKeyTakeaways(babyTrackerData?.keyTakeaways);
      setBabyOverallInfo(babyTrackerData?.babyInfo?.babyOverallInfo);
      setBabySizeInfo(babyTrackerData?.babyInfo?.babySizeInfo);
      setHigh(babyTrackerData?.babyInfo?.high);
      setWeight(babyTrackerData?.babyInfo?.weight);
      setBabyId(babyTrackerData?.babyInfo?.id);
      setImage3DUrl(babyTrackerData?.babyInfo?.image3DUrl);
      setSizeShortDescription(babyTrackerData?.babyInfo?.sizeShortDescription);
      setSymbolicImageUrl(babyTrackerData?.babyInfo?.symbolicImageUrl);
      setThumbnail3DUrl(babyTrackerData?.babyInfo?.thumbnail3DUrl);
      // mom
      setIdMom(babyTrackerData?.momInfo?.id);
      setMomImage3DUrl(babyTrackerData?.momInfo?.image3DUrl);
      setSymptoms(babyTrackerData?.momInfo?.symptoms);
      setThingsToAvoid(babyTrackerData?.momInfo?.thingsToAvoid);
      setThingsTodo(babyTrackerData?.momInfo?.thingsTodo);
      setMomThumbnail3DUrl(babyTrackerData?.momInfo?.thumbnail3DUrl);
    }
  }, [babyTrackerData]);

  const methods = useForm<ISurVeyForm>({
    resolver: yupResolver(schemaAddSurvey),
    defaultValues: babyTrackerData || DEFAULT_ADD_SURVEY, // Sử dụng dữ liệu truyền vào nếu có
  });

  // upload image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for the uploaded file
      // reader.readAsDataURL(file);
      // const fileURL = URL.createObjectURL(file);
      setSymbolicImageUrl(file);
    }
  };
  // upload image
  const handleImageUpload2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for the uploaded file
      // const fileURL = URL.createObjectURL(file);
      setThumbnail3DUrl(file);
    }
  };
  // upload image
  const handleImageUploadMom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for the uploaded file
      // const fileURL = URL.createObjectURL(file);
      setMomThumbnail3DUrl(file);
    }
  };
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

  const UpdateTracker = async () => {
    const formData = new FormData();

    formData.append('week', week);
    formData.append('keyTakeaways', keyTakeaways);
    formData.append('weight', weight);
    formData.append('high', high);
    formData.append('thingsToAvoid', thingsToAvoid);
    formData.append('thingsTodo', thingsTodo);
    formData.append('symptoms', symptoms);
    // formData.append('symbolicImage', sizeShortDescription);
    formData.append('sizeShortDescription', sizeShortDescription);
    // formData.append('babyOverallInfo', babyOverallInfo);
    formData.append('idTracker', idTracker);
    formData.append(
      'babyOverallInfo',
      babyOverallInfo ? String(babyOverallInfo).trim() : ''
    );

    formData.append('image3DUrlMom', momImage3DUrl);

    // Xử lý file ảnh (image3DUrlMom và thumbnail3DMom)
    if (momThumbnail3DUrl instanceof File) {
      if (momThumbnail3DUrl) formData.append('thumbnail3DMom', momThumbnail3DUrl); // Gửi file trực tiếp
    }
    if (thumbnail3DUrl instanceof File) {
      if (thumbnail3DUrl) formData.append('thumbnail3DBaby', thumbnail3DUrl);
    }

    if (image3DUrl instanceof File) {
      if (image3DUrl) formData.append('symbolicImage', image3DUrl);
    }

    // Kiểm tra nếu `week` có giá trị hợp lệ
    if (!week) {
      console.error('Tuần không hợp lệ.');
      return;
    }

    // Gọi mutate với dữ liệu đã chuẩn bị
    mutate(formData);
  };

  console.log(babyTrackerData?.week);
  return (
    <Stack spacing={3}>
      <FormProvider
        methods={methods}
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
              label="Chiều cao (cm)"
              variant="outlined"
              value={high}
              onChange={(e) => setHigh(e.target.value)}
            />

            <TextField
              id="weight"
              label="Cân nặng (gram)"
              variant="outlined"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />

            {/* <TextField
              id="babyId"
              label="ID Thai nhi"
              variant="outlined"
              value={babyId}
              onChange={(e) => setBabyId(e.target.value)}
            /> */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: '1fr 1fr',
                },
                gap: 2,
              }}
            >
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
                  border: 'none', // Loại bỏ viền của iframe
                }}
              >
                <iframe
                  src={image3DUrl}
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
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: '1fr 1fr',
                },
                gap: 2,
              }}
            >
              {/* <TextField
                id="symbolicImageUrl"
                label="URL Hình ảnh tượng trưng"
                variant="outlined"
                value={symbolicImageUrl}
                onChange={(e) => setSymbolicImageUrl(e.target.value)}
              /> */}
              <Typography>URL Hình ảnh tượng trưng</Typography>
              {/* Input for file upload */}
              <input
                type="file"
                accept="image/*" // Only allow image files
                onChange={handleImageUpload}
              />

              {/* Preview the uploaded image */}
              {/* {symbolicImageUrl && (
                <img
                  src={symbolicImageUrl}
                  width={'100%'}
                  height={'300px'}
                  alt="img tượng trưng"
                />
              )} */}
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: '1fr 1fr',
                },
                gap: 2,
              }}
            >
              {/* <TextField
                id="symbolicImageUrl"
                label="URL Hình ảnh thu nhỏ 3D"
                variant="outlined"
                value={symbolicImageUrl}
                onChange={(e) => setSymbolicImageUrl(e.target.value)}
              /> */}
              <Typography>URL Hình ảnh thu nhỏ 3D</Typography>

              {/* Input for file upload */}
              <input
                type="file"
                accept="image/*" // Only allow image files
                onChange={handleImageUpload2}
              />

              {/* Preview the uploaded image */}
              {/* {thumbnail3DUrl && (
                <img
                  src={thumbnail3DUrl}
                  width={'100%'}
                  height={'300px'}
                  alt="img tượng trưng"
                />
              )} */}
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
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: '1fr 1fr',
                },
                gap: 2,
              }}
            >
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
                  border: 'none', // Loại bỏ viền của iframe
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
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: '1fr 1fr',
                },
                gap: 2,
              }}
            >
              {/* <TextField
                id="momThumbnail3DUrl"
                label="URL Hình ảnh thu nhỏ 3D"
                variant="outlined"
                value={momThumbnail3DUrl}
                onChange={(e) => setThumbnail3DUrl(e.target.value)}
              /> */}
              {/* <img
                src={momThumbnail3DUrl}
                width={'100%'}
                height={'300px'}
                alt="URL Hình ảnh thu nhỏ 3D"
              /> */}
              {/* Input for file upload */}
              <Typography>URL Hình ảnh thu nhỏ 3D</Typography>

              <input
                type="file"
                accept="image/*" // Only allow image files
                onChange={handleImageUploadMom}
              />

              {/* Preview the uploaded image */}
              {/* {momThumbnail3DUrl && (
                <img
                  src={momThumbnail3DUrl}
                  width={'100%'}
                  height={'300px'}
                  alt="thumbnail3DMom"
                />
              )} */}
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
            onClick={() => UpdateTracker()}
          >
            Cập nhật
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
