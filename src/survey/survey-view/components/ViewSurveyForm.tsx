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
import ViewQuestionItemDetails from './ViewQuestionItem';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { useGetSurveyById } from '../../survey-edit/hooks/useGetSurveyById';
import { useEffect } from 'react';
import { ISurVeyForm } from '../../common/survey.interface';
import { IStatus } from '../../common/survey.constant';
import vn from '../../../common/locales/vn';

export default function FormViewSurvey() {
  const methods = useForm<ISurVeyForm>({
    resolver: yupResolver(schemaAddSurvey),
    defaultValues: DEFAULT_ADD_SURVEY,
  });
  const navigate = useNavigate();

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
    if (dataSurvey) reset(dataSurvey);
    setValue('status', dataSurvey?.status === IStatus.ACTIVE ? true : false);
  }, [dataSurvey]);
  const onSubmit = () => {};

  return (
    <Stack spacing={3}>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {vn.survey.inforQuestion}
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ padding: 2 }}>
          <Stack spacing={3}>
            <RHFTextField size="medium" name="id" label="ID" defaultValue={1} disabled />
            <RHFTextField size="medium" name="name" label="Tiêu đề" disabled />
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
                      disabled
                      label="Ngày bắt đầu"
                      inputFormat={FORMAT_DATE_NEWS}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          disabled
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
                      disabled
                      inputFormat={FORMAT_DATE_NEWS}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          disabled
                          helperText={errors.endDate && errors.endDate?.message}
                          error={!!errors.endDate}
                        />
                      )}
                    />
                  </Stack>
                )}
              />
            </Stack>
            <Switch checked={dataSurvey?.status === 'ACTIVE' ? true : false} disabled />
            <RHFTextField
              size="medium"
              name="point"
              InputLabelProps={{ shrink: true }}
              label="Tích xu"
              disabled
            />
            <ViewQuestionItemDetails />
          </Stack>
        </Card>
        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            color="inherit"
            size="medium"
            variant="contained"
            onClick={() => navigate(PATH_DASHBOARD.survey.list)}
          >
            {vn.survey.back}
          </Button>
          <Button
            onClick={() => navigate(PATH_DASHBOARD.survey.edit(Number(idSurvey)))}
            size="large"
            variant="contained"
          >
            {vn.edit}
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
