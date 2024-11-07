import {
  Button,
  Container,
  FormLabel,
  InputLabel,
  Paper,
  Select,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  OutlinedInput,
  Card,
  Typography,
  Switch,
} from '@mui/material';
import { FormProvider, RHFTextField } from '../../../../common/components/hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DEFAULT_VALUE_USER_SURVEY, MOCK_DATA_USER_SURVEY } from '../constants';
import { DEFAULT_MAIN_COLOR } from '../../../../common/constants/common.constants';
import Iconify from '../../../../common/components/Iconify';
import { useEffect } from 'react';
import useDeepEffect from '../../../../common/hooks/useDeepEffect';
import { PATH_DASHBOARD } from '../../../../common/routes/paths';
import { useGetDetailUsersSurvey } from '../hooks/useGetDetailUserSurvey';
import { IParamsDetailUserSurvey } from '../interface';
import { formatDate, formatDateNoTime } from '../../../../common/constants/common.utils';
import { dispatch, useSelector } from '../../../../common/redux/store';
import { ConfirmModal } from '../../../../common/components/modal/ConfirmModal';
import { closeConfirmModal } from '../../../common/survey.slice';

export default function FormDetailUserSurvey() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { useDeepCompareEffect } = useDeepEffect();
  const methods = useForm<any>({
    defaultValues: DEFAULT_VALUE_USER_SURVEY,
  });
  const { confirmModal } = useSelector((state) => state.survey);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;

  const { userId, surveyId } = useParams();
  const searchParams: IParamsDetailUserSurvey = {
    surveyId: parseInt(surveyId as string),
    userId: parseInt(userId as string),
  };

  const { data } = useGetDetailUsersSurvey(searchParams);
 
  useDeepCompareEffect(() => {
    if (data) {
      setValue('actionDate', formatDate(data?.actionDate));
      setValue('name', data?.user?.customer?.name);
      setValue('phoneNumber', data?.user?.customer?.phoneNumber);
    }
  }, [data]);
  const handleCloseDeleteModal = () => {
    dispatch(closeConfirmModal());
  };
  const onSubmit = () => {};
  return (
    <>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={handleCloseDeleteModal}
        onSubmit={confirmModal.callback}
        type={'warning'}
        text={confirmModal.text}
      />
    <Paper elevation={3} sx={{ boxShadow: 10, padding: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

        <Stack spacing={3}>
          <Stack direction={{ md: 'row', sm: 'column', xs: 'column' }} spacing={2}>
            <RHFTextField
              name="name"
              label={t('survey.userSurvey.name')}
              disabled
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: 'black',
                },
              }}
            />
            <RHFTextField
              name="phoneNumber"
              label={t('survey.userSurvey.phoneNumber')}
              disabled
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: 'black',
                },
              }}
            />
            <RHFTextField
              name="actionDate"
              label={t('survey.userSurvey.time')}
              disabled
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: 'black',
                },
              }}
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h6">{t('survey.userSurvey.answersDetail')}</Typography>
            {data?.userSurveyAnswer?.map((question, indexQ: number) => (
              <Card
                key={indexQ}
                sx={{
                  p: 3,
                  background: `linear-gradient(to right bottom, white, white, ${DEFAULT_MAIN_COLOR})`,
                  boxShadow: 3,
                  borderRadius: '8px',
                }}
              >
                <Stack direction="column" spacing={2}>
                  <TextField
                    size="medium"
                    value={question?.questionContent}
                    label={`Câu hỏi số ${indexQ + 1}`}
                    disabled
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: 'black',
                      },
                    }}
                  />
                  <Stack
                    spacing={2}
                    sx={{
                      borderRadius: '8px',
                      bg: `linear-gradient(to left bottom, white, ${DEFAULT_MAIN_COLOR})`,
                      p: 3,
                      pr: 0,
                    }}
                  >
                    {question?.answers?.map((answer, indexA: number) => (
                      <Stack
                        key={indexA}
                        spacing={2}
                        direction={'row'}
                        width={'100%'}
                        alignItems={'center'}
                      >
                        <Iconify icon={'ic:outline-question-answer'} fontSize={'30px'} />
                        <TextField
                          fullWidth
                          disabled
                          size="medium"
                          value={answer?.content}
                          label={`Câu trả lời số ${indexA + 1}`}
                          sx={{
                            '& .MuiInputBase-input.Mui-disabled': {
                              WebkitTextFillColor: 'black',
                            },
                          }}
                        />
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Stack>
      </FormProvider>
    </Paper>
    </>
  );
}
