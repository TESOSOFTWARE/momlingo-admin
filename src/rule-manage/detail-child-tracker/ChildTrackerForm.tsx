
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import "./styles.css";
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
interface ChildTracker {
  childTrackerData?: any; // Thông tin dữ liệu truyền từ parent
}

export default function FormChildTracker({ childTrackerData }: ChildTracker) {
  const navigate = useNavigate();
  const methods = useForm<ISurVeyForm>({
    resolver: yupResolver(schemaAddSurvey),
    defaultValues: childTrackerData || DEFAULT_ADD_SURVEY, // Sử dụng dữ liệu truyền vào nếu có
  });

  console.log(childTrackerData)
  const {
    handleSubmit,
    formState: { isSubmitting },
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

  console.log(childTrackerData?.week);
  const [editorData, setEditorData] = React.useState('');

  // Define the type for the editor change handler
  const handleEditorChange = (event: Event, editor: Editor) => {
    
    console.log()
    setEditorData(editor.getData());
  };
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
            value={childTrackerData?.week || ''} // Gán giá trị trực tiếp
            onChange={(e) => console.log(e.target.value)} // Có thể thêm hàm xử lý sự kiện khi thay đổi giá trị
          />
          
          <Box>
            <h2>Nội dung</h2>
            <CKEditor
              editor={ClassicEditor}
              data= {childTrackerData?.content}
              onChange={handleEditorChange}
            />
          </Box>
          
        </Stack>
      </Card>
      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="contained"
          loading={isSubmitting}
          type="submit"
        >
          Cập nhập
        </LoadingButton>
      </Stack>
    </FormProvider>
  </Stack>
  );
}
