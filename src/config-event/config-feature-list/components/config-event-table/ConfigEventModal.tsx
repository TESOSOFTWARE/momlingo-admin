import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
} from '../../../../common/components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DEFAULT_VALUE_EVENT_CONFIG } from '../../constants';
import { schemaChangeEventConfig } from '../../shema';
import {
  IConfigEventListForm,
  IFormChangeEventConfig,
} from '../../config-event-interface';
import { Controller, useForm } from 'react-hook-form';
import { Stack, Button } from '@mui/material';
import useMessage from '../../../../common/hooks/useMessage';
import { useEditConfigEvent } from '../../hooks/useEditConfigEvent';
import { useDispatch, useSelector } from 'react-redux';
import {
  eventConfigRowItemsSelector,
  setIsOpenConfirmModal,
} from '../../config-event-slice';
import { useEffect } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import en from '../../../../common/locales/en';
import { LabelStyle } from '../../../../config-home/components/banners-section/BannerConfig';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  rowCode: string;
  nameEvent: string;
  status: boolean;
  configEventList?: IConfigEventListForm;
};
export default function ConfirmChangeConfigEventModal(prop: ConfirmModalProps) {
  const { isOpen, onClose, rowCode, nameEvent, status } = prop;
  let { configEventList } = prop;
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { t } = useTranslation();
  const methods = useForm<IFormChangeEventConfig>({
    resolver: yupResolver(schemaChangeEventConfig),
    defaultValues: DEFAULT_VALUE_EVENT_CONFIG,
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = methods;
  const dispatch = useDispatch();
  const { mutate, isSuccess } = useEditConfigEvent({
    onSuccess: () => {
      showSuccessSnackbar(t('configEvent.edit.success'));
    },
    onError: () => {
      showErrorSnackbar(t('configEvent.edit.fail'));
    },
  });
  const event = useSelector(eventConfigRowItemsSelector);
  useEffect(() => {
    reset(event)
  }, [event]);

  const onSubmitForm = (data: any) => {
    configEventList = {
      ...configEventList,
      [event?.code]: {
        desc: data?.desc,
        status: data?.status ? 1 : 0,
        endDate: data?.endDate,
        startDate: data?.startDate
      },
    };
    const dataEdit = {
      eventConfig: configEventList,
    };
    mutate(dataEdit);
    dispatch(setIsOpenConfirmModal(false));
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        BackdropProps={{
          sx: {
            opacity: '0.1!important',
            background: 'black!important',
          },
        }}
        PaperProps={{
          elevation: 0,
          sx: { boxShadow: 0 },
        }}
        maxWidth="md"
        sx={{
          width: '100%',
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              minWidth: '200px', // Set your width here
            },
          },
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitForm)}>
          <DialogTitle>{t('configEvent.modal.title')}</DialogTitle>
          <DialogContent sx={{ marginTop: '20px' }}>
            <Stack spacing={3} >
           <LabelStyle ml="2px" color='red !important' >{event?.code}</LabelStyle>
              <RHFTextField  label={t('configEvent.modal.desc')} InputLabelProps={{ shrink: true }} name="desc" />
              <RHFSwitch
                label={t('configEvent.modal.status')}
                name="status"
                checked={event?.status}
              />
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <Stack position="relative" width="100%">
                    <DateTimePicker
                      {...field}
                      label={t('configEvent.modal.startDate')}
                      inputFormat="dd/MM/yyyy hh:mm:ss"
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
                      label={t('configEvent.modal.endDate')}
                      inputFormat="dd/MM/yyyy hh:mm:ss"
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
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} variant="contained" color="inherit">
              {t('configEvent.button.cancel')}
            </Button>
            <Button type="submit" variant="contained">
              {t('configEvent.button.edit')}
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
