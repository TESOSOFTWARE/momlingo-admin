import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormProvider } from '../../common/components/hook-form';
import useMessage from '../../common/hooks/useMessage';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { ISurVeyForm } from '../../survey/common/survey.interface';
import { DEFAULT_ADD_SURVEY } from '../../survey/contanst';
import { schemaAddSurvey } from '../../survey/schema';
import InputComponent from '../components/input/input';
import './styles.css';
import { useCreateChildTracker } from '../hooks/useCreateChildTracker copy';
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

  const [data, setData] = React.useState<string>(childTrackerData?.content);
  const [week, setWeek] = React.useState('0');
  // Hàm xử lý dữ liệu nhận từ con
  const handleDataFromChild = (updatedData: string): void => {
    setData(updatedData);
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate } = useCreateChildTracker({
    onSuccess: () => {
      showSuccessSnackbar('Child tracker created successfully');
      navigate(PATH_DASHBOARD.ruleManage.list);
    },
    onError: () => {
      showErrorSnackbar('Failed to create child tracker');
    },
  });

  const onSubmit = () => {
    const updatedData = {
      week: week,
      content: data,
    };

    // mutate(dataCreate);
    try {
      // await mutate(updatedData); // Gọi API submit
      console.log('data update', updatedData);
      mutate(updatedData);
    } catch (error) {
      console.error('Submit failed:', error);
    }
  };

  React.useEffect(() => {
    setData(childTrackerData?.content || '');
  }, [childTrackerData]);

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
              value={week || ''} // Gán giá trị trực tiếp
              onChange={(e) => {
                // Ensure that the input value is a number or empty string
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setWeek(value);
                }
              }}
              inputProps={{
                inputMode: 'numeric', // This is for mobile devices to show the numeric keypad
                pattern: '[0-9]*', // This enforces numeric input on some browsers
              }}
            />
            <InputComponent
              data={childTrackerData?.content}
              onUpdateData={handleDataFromChild}
            />
          </Stack>
        </Card>
        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
          <LoadingButton size="large" variant="contained" onClick={() => onSubmit()}>
            Thêm mới
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
