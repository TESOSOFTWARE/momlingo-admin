import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
} from '../../../common/components/hook-form';
import Scrollbar from '../../../common/components/Scrollbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { DEFAULT_ADD_SURVEY, FORMAT_DATE_NEWS } from '../../contanst';
import { schemaAddSurvey } from '../../schema';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import { DateTimePicker } from '@mui/x-date-pickers';
import EditQuestionItemDetails from './EditQuestionItem';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { useGetSurveyById } from '../hooks/useGetSurveyById';
import { useEffect } from 'react';
import {
  ISurVeyEditForm,
  ISurVeyForm,
  SurveyTableProps,
} from '../../common/survey.interface';
import { useEditSurvey } from '../hooks/useEditSurvey';
import vn from '../../../common/locales/vn';
import useMessage from 'src/common/hooks/useMessage';
import { IStatus } from '../../common/survey.constant';

export default function FormEditSurvey() {
  const navigate = useNavigate();

  const methods = useForm<ISurVeyForm>({
    resolver: yupResolver(schemaAddSurvey),
    defaultValues: DEFAULT_ADD_SURVEY,
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = methods;
  const { id } = useParams();
  const idSurvey = parseInt(id as string);
  const { data: dataSurvey } = useGetSurveyById(idSurvey);
  useEffect(() => {
    if (dataSurvey) {
      reset(dataSurvey);
      setValue('status', dataSurvey?.status === 'ACTIVE' ? true : false);
      setValue('point', dataSurvey?.point);
    }
  }, [dataSurvey]);
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isSuccess } = useEditSurvey({
    onSuccess: () => {
      showSuccessSnackbar(vn.survey.edit.sucess);
      navigate(PATH_DASHBOARD.survey.list);
    },
    onError: () => showErrorSnackbar(vn.survey.edit.fail),
  });
  const onSubmit = (data: ISurVeyEditForm) => {
    const dataCreate = {
      ...data,
      status: data.status ? IStatus.ACTIVE : IStatus.IN_ACTIVE,
      point: data?.point,
    };
    delete dataCreate?.id;
    delete dataCreate?.userId;
    mutate({ data: dataCreate, id: idSurvey });
    // console.log('data =', dataCreate);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {vn.survey.inforQuestion}
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ padding: 2 }}>
          <Stack spacing={3}>
            <RHFTextField size="medium" name="name" label="Tiêu đề" />
            <RHFTextField size="medium" name="description" label="Mô tả" />

            <Stack
              spacing={'10px'}
              direction="row"
              alignItems={'center'}
              position="relative"
            >
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <Stack position="relative" width="100%">
                    <DateTimePicker
                      {...field}
                      label="Ngày bắt đầu"
                      inputFormat={FORMAT_DATE_NEWS}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          helperText={errors.startDate && errors.startDate?.message}
                          error={!!errors.startDate}
                        />
                      )}
                    />
                  </Stack>
                )}
              />
              <Box sx={{ mx: 2 }}>-</Box>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <Stack position={'relative'} width="100%">
                    <DateTimePicker
                      {...field}
                      label="Ngày kết thúc"
                      inputFormat={FORMAT_DATE_NEWS}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          helperText={errors.endDate && errors.endDate?.message}
                          error={!!errors.endDate}
                        />
                      )}
                    />
                  </Stack>
                )}
              />
            </Stack>
            <RHFSwitch name={'status'} label="Trạng thái" />
            <RHFTextField
              InputLabelProps={{ shrink: true }}
              name="point"
              label="Tích xu"
              type="number"
              placeholder="0"
            />
            <EditQuestionItemDetails />
          </Stack>
        </Card>
        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            color="inherit"
            size="medium"
            variant="contained"
            onClick={() => navigate(PATH_DASHBOARD.survey.view(idSurvey))}
          >
            Hủy bỏ
          </Button>
          <LoadingButton
            size="large"
            variant="contained"
            loading={isSubmitting}
            type="submit"
          >
            Lưu khảo sát
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
