import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Container,
  FormHelperText,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import { dispatch } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { setDataPostCode, setPopup } from '../../code-common/code.slice';
import { OnSubmitValuePost } from '../create.interface';
import { getEvent } from '../create.service';
import { CodePostSchema } from '../schema/create.schema';
import ConfirmCreate from './ConfirmCreate';
import { RHFSelectPaginationSingle } from './RHFSelectPaginationSingle';

export default function CodeCreateForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const methods = useForm<OnSubmitValuePost>({
    resolver: yupResolver(CodePostSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data: OnSubmitValuePost) => {
    const formatDay = new Date(data.expiresAt);
    const dataPostCode = {
      amount: data.amount,
      eventId: data.eventId.value,
      useTime: data.useTime,
      expiresAt: formatDay.toISOString(),
    };
    dispatch(setDataPostCode(dataPostCode));
    dispatch(setPopup(true));
  };
  return (
    <Paper elevation={3}>
      <Container sx={{ padding: '25px' }}>
        <ConfirmCreate />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFSelectPaginationSingle
            name="eventId"
            placeholder={t('eventName')}
            getAsyncData={getEvent}
            error={errors}
          />
          <Stack spacing={3}>
            <FormHelperText sx={{ color: 'red', marginLeft: '20px' }}>
              {errors.eventId?.message}
            </FormHelperText>

            <RHFTextField
              name="amount"
              label={t('amount')}
              placeholder={t('codeAmountPlacehoder')}
            />

            <RHFTextField
              name="useTime"
              label={t('useTime')}
              placeholder={t('codeUseTimePlacehoder')}
            />

            <Controller
              name="expiresAt"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Stack position="relative" width="100%">
                  <DateTimePicker
                    {...field}
                    label={t('expiresAt')}
                    inputFormat="dd-MM-yyyy hh:mm a"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        helperText={errors.expiresAt && errors.expiresAt?.message}
                        error={!!errors.expiresAt}
                      />
                    )}
                  />
                </Stack>
              )}
            />

            <Stack direction="row" spacing={3} justifyContent="flex-end">
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {t('create')}
              </LoadingButton>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => {
                  navigate(PATH_DASHBOARD.code.list);
                }}
              >
                {t('cancel')}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </Container>
    </Paper>
  );
}
