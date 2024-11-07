// import {
//   Box,
//   Button,
//   Card,
//   FormControl,
//   FormControlLabel,
//   FormHelperText,
//   Radio,
//   RadioGroup,
//   Stack,
//   Switch,
//   TextField,
//   Typography,
// } from '@mui/material';
// import { ISurVeyForm } from '../../survey/common/survey.interface';
// import { useNavigate } from 'react-router-dom';
// import { Controller, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { schemaAddSurvey } from '../../survey/schema';
// import { DEFAULT_ADD_SURVEY, FORMAT_DATE_NEWS } from '../../survey/contanst';
// import useMessage from '../../common/hooks/useMessage';
// import { useSurveyCreate } from '../../survey/survey-create/hooks/useSurveyCreate';
// import { PATH_DASHBOARD } from '../../common/routes/paths';
// import vn from '../../common/locales/vn';
// import { IStatus } from '../../game-manage/constants';
// import { FormProvider, RHFSwitch, RHFTextField } from '../../common/components/hook-form';
// import { DateTimePicker, LoadingButton } from '@mui/lab';
// import QuestionItemDetails from '../../survey/survey-create/components/CreateQuestionItem';

// export default function FormCreateSurvey() {
//   const navigate = useNavigate();

//   const methods = useForm<ISurVeyForm>({
//     resolver: yupResolver(schemaAddSurvey),
//     defaultValues: DEFAULT_ADD_SURVEY,
//   });

//   const {
//     control,
//     handleSubmit,
//     setValue,
//     watch,
//     reset,
//     formState: { errors, isSubmitting },
//   } = methods;
//   const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

//   const { mutate } = useSurveyCreate({
//     onSuccess: () => {
//       showSuccessSnackbar(vn.survey.create.sucess);
//       navigate(PATH_DASHBOARD.survey.list);
//     },
//     onError: () => {
//       showErrorSnackbar(vn.survey.create.fail);
//     },
//   });
//   const onSubmit = (data: ISurVeyForm) => {
//     const dataCreate = {
//       ...data,
//       status: data.status ? IStatus.ACTIVE : IStatus.IN_ACTIVE,
//       point: data.point ? data.point : 0,
//     };
//     mutate(dataCreate);
//   };

//   return (
//     <Stack spacing={3}>
//       {/* <Typography variant="body1" sx={{ fontWeight: 600 }}> */}
//         {/* {vn.survey.inforQuestion} */}

//       {/* </Typography> */}
//       <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//         <Card sx={{ padding: 2 }}>
//           <Stack spacing={3}>
//             <RHFTextField size="medium" name="name" label="Tiêu đề" />
//             <RHFTextField size="medium" name="description" label="Mô tả" />
            
//             <RHFSwitch name={'status'} label="Trạng thái" />

//             <RHFTextField
//               type="number"
//               name="point"
//               InputLabelProps={{ shrink: true }}
//               label="Tích xu"
//               placeholder='0'
//             />
//           </Stack>
//         </Card>
//         <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
//           <Button
//             color="inherit"
//             size="medium"
//             variant="contained"
//             onClick={() => navigate(PATH_DASHBOARD.survey.list)}
//           >
//             Hủy bỏ
//           </Button>
//           <LoadingButton
//             size="large"
//             variant="contained"
//             loading={isSubmitting}
//             type="submit"
//           >
//             Thêm khảo sát
//           </LoadingButton>
//         </Stack>
//       </FormProvider>
//     </Stack>
//   );
// }
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

// Sửa lại để nhận data từ parent
interface FormCreateSurveyProps {
  babyTrackerData?: any; // Thông tin dữ liệu truyền từ parent
}

export default function FormCreateSurvey({ babyTrackerData }: FormCreateSurveyProps) {
  const navigate = useNavigate();
  console.log('ues', babyTrackerData)
  
  const methods = useForm<ISurVeyForm>({
    resolver: yupResolver(schemaAddSurvey),
    defaultValues: babyTrackerData || DEFAULT_ADD_SURVEY, // Sử dụng dữ liệu truyền vào nếu có
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

  const { mutate } = useSurveyCreate({
    onSuccess: () => {
      showSuccessSnackbar("Survey created successfully");
      navigate(PATH_DASHBOARD.survey.list);
    },
    onError: () => {
      showErrorSnackbar("Failed to create survey");
    },
  });

  const onSubmit = (data: ISurVeyForm) => {
    const dataCreate = {
      ...data,
      status: data.status ? IStatus.ACTIVE : IStatus.IN_ACTIVE,
      point: data.point ? data.point : 0,
    };
    mutate(dataCreate);
  };

  console.log(babyTrackerData?.week);
  return (
    <Stack spacing={3}>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ padding: 2 }}>
        <Stack spacing={3}>
          {/* Hiển thị Tiêu đề */}
          <TextField
            id="outlined-basic"
            label="Tuần"
            variant="outlined"
            value={babyTrackerData?.week || ''} // Gán giá trị trực tiếp
            onChange={(e) => console.log(e.target.value)} // Có thể thêm hàm xử lý sự kiện khi thay đổi giá trị
          />
          {/* Hiển thị Mô tả */}
          <TextField
            id="keyTakeaways"
            label="Khoá"
            variant="outlined"
            multiline={true}  // Sử dụng true thay vì 'true'
            value={babyTrackerData?.keyTakeaways || ''} // Gán giá trị trực tiếp
            onChange={(e) => console.log(e.target.value)} // Có thể thêm hàm xử lý sự kiện khi thay đổi giá trị
          />
          {/* Hiển thị Thông tin thai nhi */}
          <Typography variant="h6">Thông tin thai nhi:</Typography>
          <Typography variant="body1">{babyTrackerData?.babyOverallInfo}</Typography>
          <Typography variant="body1">{babyTrackerData?.babySizeInfo}</Typography>
          <Typography variant="body1">{babyTrackerData?.keyTakeaways}</Typography>
          
          {/* Trạng thái - Hiển thị giá trị trạng thái */}
          <RHFSwitch name="status" label="Trạng thái" defaultValue={babyTrackerData?.status || false} />
          
          {/* Hiển thị điểm tích xu */}
          <RHFTextField
            type="number"
            name="point"
            InputLabelProps={{ shrink: true }}
            label="Tích xu"
            placeholder="0"
            defaultValue={babyTrackerData?.point || 0}
          />
          
          {/* Hiển thị thông tin mẹ */}
          <Typography variant="h6">Thông tin mẹ:</Typography>
          <RHFTextField
            size="medium"
            name="momInfo"
            label="Thông tin mẹ"
            defaultValue={babyTrackerData?.momInfo || ''}
          />
  
          {/* Hiển thị triệu chứng */}
          <Typography variant="h6">Triệu chứng:</Typography>
          <Typography variant="body1">{babyTrackerData?.symptoms}</Typography>
  
          {/* Hiển thị những điều cần tránh */}
          <Typography variant="h6">Những điều cần tránh:</Typography>
          <Typography variant="body1">{babyTrackerData?.thingsToAvoid}</Typography>
  
          {/* Hiển thị những điều cần làm */}
          <Typography variant="h6">Những điều cần làm:</Typography>
          <Typography variant="body1">{babyTrackerData?.thingsTodo}</Typography>
  
          {/* Hiển thị hình ảnh 3D của thai nhi */}
          <img src={babyTrackerData?.image3DUrl} alt="Hình ảnh 3D thai nhi" style={{ width: '100%' }} />
        </Stack>
      </Card>
      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          color="inherit"
          size="medium"
          variant="contained"
          onClick={() => navigate(PATH_DASHBOARD.survey.list)}
        >
          Hủy bỏ
        </Button>
        <LoadingButton
          size="large"
          variant="contained"
          loading={isSubmitting}
          type="submit"
        >
          Thêm khảo sát
        </LoadingButton>
      </Stack>
    </FormProvider>
  </Stack>
  );
}
