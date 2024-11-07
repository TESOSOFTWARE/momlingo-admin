import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Paper,
  Stack,
  TextField,
  Box,
  MenuItem,
  Card,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from 'src/common/components/hook-form';
import useMessage from 'src/common/hooks/useMessage';
import i18n from 'src/common/locales/i18n';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import useDeepEffect from '../../../common/hooks/useDeepEffect';
import { useGetListSystemConfigPoint } from '../../hooks/useGetListSystemConfig';
import { IEventSkus, IFormCreateEvent, ISystemConfigPoint } from '../../common/interfaces';
import { DEFAULT_VALUES_EVENT, TypeEvent, TypeEventReward } from '../../common/constant';
import RHFSelectSystemConfigPoint from '../../common/components/RHFSelectSearch';
import { useEditEvent } from '../../hooks/useEditEvent';
import { useGetEventById } from '../../hooks/useEventById';
import { schemaCreateEvent } from '../../common/shema';

export default function FormEditEvent() {
  const navigate = useNavigate();
  const methods = useForm<IFormCreateEvent>({
    resolver: yupResolver(schemaCreateEvent),
    defaultValues: DEFAULT_VALUES_EVENT,
  });
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;

  const dispatch = useDispatch();
  const { id } = useParams();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { useDeepCompareEffect } = useDeepEffect();

  const { data: dataSCP, isLoading: isLoadingSCP } = useGetListSystemConfigPoint({});
  const { data: dataEvent, isLoading: isLoadingEvent } = useGetEventById(
    parseInt(id as string)
  );

  const { mutate } = useEditEvent({
    onSuccess: () => {
      showSuccessSnackbar('Chỉnh sửa thành công !');
      navigate(PATH_DASHBOARD.event.list);
    },
    onError: () => {
      showErrorSnackbar('Chỉnh sửa thất bại !');
    },
  });
  const listSystemConfigPoint = dataSCP?.items || [];

  useDeepCompareEffect(() => {
    if (dataEvent) {
      const arrSCP = dataEvent?.eventSkus?.map((item) =>{ return item?.systemConfigPoint}) || [];
      const dataResetEvent = {
        ...dataEvent,
        status: dataEvent?.status,
        systemConfigPointIds: arrSCP,
      };
      reset(dataResetEvent);
    }
  }, [dataEvent]);

  const onSubmit = (dataSubmit: any) => {
    const dataEdit = {
      id: parseInt(id as string),
      name: dataSubmit?.name,
      type: dataSubmit?.type,
      startDate: dataSubmit?.startDate,
      endDate: dataSubmit?.endDate,
      eventReward: dataSubmit?.eventReward,
      status: dataSubmit?.status ? 'ACTIVE' : 'IN_ACTIVE',
      systemConfigPointIds: dataSubmit?.systemConfigPointIds?.map((item: ISystemConfigPoint) => item?.id),
    };
    mutate(dataEdit);

  };
  return (
    <Paper elevation={3} sx={{ boxShadow: 10, padding: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={'column'} spacing={3}>
          <Stack direction={'row'} spacing={2}>
            <RHFTextField name="name" label={t('event.form.name')} />
            <RHFSelect
              name="type"
              label={t('event.form.type')}
              SelectProps={{ native: false }}
            >
              <MenuItem value="" disabled />
              {Object?.values(TypeEvent)?.map((type, index) => (
                <MenuItem value={type} key={index}>
                  {type}
                </MenuItem>
              ))}
            </RHFSelect>
          </Stack>
          <RHFSelectSystemConfigPoint
            name="systemConfigPointIds"
            label={t('event.form.product')}
            labelProp="code"
            labelSupport="productGroup"
            options={listSystemConfigPoint}
          />
          <Stack direction={'row'} spacing={2}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Stack position="relative" width="100%">
                  <DateTimePicker
                    {...field}
                    label={t('event.form.startDate')}
                    inputFormat={'dd/MM/yyyy hh:mm:ss'}
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
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <Stack position="relative" width="100%">
                  <DateTimePicker
                    {...field}
                    label={t('event.form.endDate')}
                    inputFormat={'dd/MM/yyyy hh:mm:ss'}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        helperText={errors.endDate && errors.endDate?.message}
                        error={!!errors.endDate}
                      />
                    )}
                  />
                </Stack>
              )}
            />
          </Stack>
          <RHFSwitch name="status" label={t('event.form.status')} />
          <Stack direction={{ md: 'row', sm: 'column' }} justifyContent={'space-between'}>
            <Card sx={{ padding: 2, boxShadow: 10, width: { sm: '100%', md: '50%' } }}>
              <Typography variant="h4">{t('event.form.eventReward.title')}</Typography>
              <Stack spacing={2} mt={2}>
                <RHFSelect
                  name="eventReward.type"
                  label={t('event.form.eventReward.type')}
                  SelectProps={{ native: false }}
                >
                  <MenuItem value="" disabled />
                  {Object?.values(TypeEventReward)?.map((type, index) => (
                    <MenuItem value={type} key={index}>
                      {type}
                    </MenuItem>
                  ))}
                </RHFSelect>
                <RHFTextField
                  name="eventReward.value"
                  label={t('event.form.eventReward.value')}
                />
              </Stack>
            </Card>

            <Box>
              <Button
                color="inherit"
                sx={{ mr: 2 }}
                variant="contained"
                onClick={() => navigate(PATH_DASHBOARD.event.list)}
              >
                {`${i18n.t('cancel')}`}
              </Button>
              <LoadingButton variant="contained" loading={isSubmitting} type="submit">
                {`${i18n.t('edit')}`}
              </LoadingButton>
            </Box>
          </Stack>
        </Stack>
      </FormProvider>
    </Paper>
  );
}
