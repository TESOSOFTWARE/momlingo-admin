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
import { useNewBabyTracker } from '../config-feature-list/hooks/useNewBabyTracker';
import FileInputField from './component/input_image';

export default function NewBabyTracker() {
  const navigate = useNavigate();

  // init data
  const [week, setWeek] = React.useState('');
  const [keyTakeaways, setKeyTakeaways] = React.useState('');
  const [momThumbnail3DUrl, setMomThumbnail3DUrl] = React.useState(
    'https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png'
  );
  const [momImage3DUrl, setMomImage3DUrl] = React.useState('');
  const [symptoms, setSymptoms] = React.useState('');
  const [thingsToAvoid, setThingsToAvoid] = React.useState('');
  const [thingsTodo, setThingsTodo] = React.useState('');
  const [high, setHigh] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [thumbnail3DBaby, setThumbnail3DBaby] = React.useState(
    'https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png'
  );
  const [image3DUrlBaby, setImage3DUrlBaby] = React.useState('');
  const [symbolicImageUrl, setSymbolicImageUrl] = React.useState(
    'https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png'
  );
  const [sizeShortDescription, setSizeShortDescription] = React.useState('');
  const [babyOverallInfo, setBabyOverallInfo] = React.useState('');
  const [babySizeInfo, setBabySizeInfo] = React.useState('');
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

  const { mutate } = useNewBabyTracker();

  // update image

  //
  const dataNewTracker = async () => {
    if (!week || isNaN(Number(week))) {
      console.error('Tuần không hợp lệ. Giá trị phải là một số.');
      return;
    }

    const formData = new FormData();

    const dataNew = {
      week: Number(week),
      keyTakeaways: keyTakeaways,
      thumbnail3DMom: momThumbnail3DUrl,
      image3DUrlMom: momImage3DUrl,
      symptoms: symptoms,
      thingsTodo: thingsTodo,
      thingsToAvoid: thingsToAvoid,
      weight: Number(weight) | 0,
      high: Number(high) | 0,
      thumbnail3DBaby: thumbnail3DBaby,
      image3DUrlBaby: image3DUrlBaby,
      symbolicImage: symbolicImageUrl,
      sizeShortDescription: sizeShortDescription,
      babyOverallInfo: babyOverallInfo,
      babySizeInfo: babySizeInfo,
    };
    console.log('data :', dataNew);
    // const numericWeek = isNaN(Number(week)) ? 0 : Math.floor(Number(week));  // Đảm bảo là số nguyên
    formData.append('week', week);
    formData.append('keyTakeaways', keyTakeaways);
    formData.append('weight', weight);
    formData.append('high', high);
    formData.append('thingsToAvoid', thingsToAvoid);
    formData.append('thingsTodo', thingsTodo);
    formData.append('symptoms', symptoms);
    // formData.append('symbolicImage', sizeShortDescription);
    formData.append('sizeShortDescription', sizeShortDescription);
    formData.append('babySizeInfo', babySizeInfo);
    // formData.append('idTracker', idTracker);
    formData.append(
      'babyOverallInfo',
      babyOverallInfo ? String(babyOverallInfo).trim() : ''
    );

    if (momImage3DUrl) formData.append('image3DUrlMom', momImage3DUrl);
    if (image3DUrlBaby) formData.append('image3DUrlBaby', image3DUrlBaby);
    // Xử lý file ảnh (image3DUrlMom và thumbnail3DMom)
    // if (momThumbnail3DUrl instanceof File) {
    if (momThumbnail3DUrl) formData.append('thumbnail3DMom', momThumbnail3DUrl); // Gửi file trực tiếp
    // }
    // if (thumbnail3DUrl instanceof File) {
    if (thumbnail3DBaby) formData.append('thumbnail3DBaby', thumbnail3DBaby);
    // }

    // if (image3DUrl instanceof File) {
    if (symbolicImageUrl) formData.append('symbolicImage', symbolicImageUrl);
    // }

    mutate(formData);
  };
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
              value={week}
              onChange={(e) => setWeek(e.target.value)}
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
            {/* image3DUrl */}
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
                label="Link dẫn đến ảnh 3D mở webview"
                variant="outlined"
                value={image3DUrlBaby}
                onChange={(e) => setImage3DUrlBaby(e.target.value)}
              />
              <Box
                sx={{
                  width: '100%',
                  height: 500, // Chiều cao của iframe, bạn có thể chỉnh sửa theo nhu cầu
                  border: 'none', // Loại bỏ viền của iframe
                }}
              >
                <iframe
                  src={image3DUrlBaby}
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
              label="Mô tả kích thước e bé"
              variant="outlined"
              value={sizeShortDescription}
              onChange={(e) => setSizeShortDescription(e.target.value)}
            />

            <Typography>Ảnh mô tả kích thước bé</Typography>
            <FileInputField
              id="symbolicImageUrl"
              label="Ảnh mô tả kích thước của bé"
              value={symbolicImageUrl}
              onChange={setSymbolicImageUrl}
            />
            {/* up here */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {/* <TextField
                id="thumbnail3DUrl"
                label="URL Hình ảnh thu nhỏ 3D"
                variant="outlined"
                value={thumbnail3DBaby}
                onChange={(e) => setThumbnail3DBaby(e.target.value)}
              />
              <img
                src={thumbnail3DBaby}
                width={'100%'}
                height={'300px'}
                alt="URL Hình ảnh thu nhỏ 3D"
              /> */}
              <Typography>URL Hình ảnh thu nhỏ 3D</Typography>
              <FileInputField
                id="thumbnail3DBaby"
                label="URL Hình ảnh thu nhỏ 3D"
                value={thumbnail3DBaby}
                onChange={setThumbnail3DBaby}
              />
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
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {/* <TextField
                id="momThumbnail3DUrl"
                label="URL Hình ảnh thu nhỏ 3D"
                variant="outlined"
                value={momThumbnail3DUrl}
                onChange={(e) => setThumbnail3DBaby(e.target.value)}
              />
              <img
                src={momThumbnail3DUrl}
                width={'100%'}
                height={'300px'}
                alt="URL Hình ảnh thu nhỏ 3D"
              /> */}
              <Typography>URL Hình ảnh thu nhỏ 3D</Typography>
              <FileInputField
                id="momThumbnail3DUrl"
                label="URL Hình ảnh thu nhỏ 3D"
                value={momThumbnail3DUrl}
                onChange={setMomThumbnail3DUrl}
              />
            </Box>
          </Stack>
        </Card>
        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
          <LoadingButton
            size="large"
            variant="contained"
            loading={isSubmitting}
            // type="submit"
            onClick={() => dataNewTracker()}
          >
            Thêm mới
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
