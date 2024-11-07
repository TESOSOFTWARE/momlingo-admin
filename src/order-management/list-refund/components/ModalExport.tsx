import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FormProvider } from '../../../common/components/hook-form';
import { DEFAULT_VALUE_EXPORT_REFUNDED_ORDER } from '../constants';
import { ISearchRefundedOrder } from '../interfaces';
import { schemaExportRefundOrder } from '../shema';
import { useExportRefundedOrders } from '../hooks/useExportRefundedOrders';
import useMessage from 'src/common/hooks/useMessage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../common/redux/store';
import { setOpenRedirectModal } from '../refunded.slice';
import { PATH_DASHBOARD } from '../../../common/routes/paths';


type ConfirmModalType = 'delete' | 'warning';
type ConfirmModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  onSubmit?: VoidFunction;
};

export const RefundExportModal = (props: ConfirmModalProps) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const methods = useForm<ISearchRefundedOrder>({
    resolver: yupResolver(schemaExportRefundOrder),
    defaultValues: DEFAULT_VALUE_EXPORT_REFUNDED_ORDER,
  });
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const searchData = useSelector(state => state.refundedOrder.dataSearch);

  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;

  const { mutate, isSuccess } = useExportRefundedOrders({
    onSuccess: () => showSuccessSnackbar(t('order.detail.refundForm.export_success')),
    onError: () => showErrorSnackbar(t('order.detail.refundForm.export_failed')),
  })

  useEffect(() => {
    setValue('startDate', searchData?.startDate);
    setValue('endDate', searchData?.endDate);
  }, [searchData])

  const onSubmit =  (data: any) => {
    const formSubmitExport={
        startDate: data?.startDate,
        endDate: data?.endDate,
    }
    mutate(formSubmitExport);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setOpenRedirectModal({
          isOpen: true,
          text: t('survey.action.export.redirectImportList'),
          callback: () => {
            navigate(PATH_DASHBOARD.fileManage.listFileExport)
          },
        })
      );
    }

  }, [isSuccess])
  
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        BackdropProps={{
          sx: { backgroundColor: 'black!important', opacity: '0.2!important' },
        }}
        PaperProps={{
          sx: { boxShadow: 0 },
        }}
        fullWidth
        maxWidth={'md'}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            sx={{ mb: 2, textTransform: 'uppercase', justifyContent: 'space-between' }}
          >
            Xuất file danh sách hoàn xu
            <DialogContentText sx={{ textTransform: 'none' }}>
              {t('order.detail.refundForm.desc')}
            </DialogContentText>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} paddingY={2} direction={'row'}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <Stack position="relative" width="100%">
                    <DateTimePicker
                      {...field}
                      label={'Ngày bắt đầu'}
                      inputFormat="dd-MM-yyyy hh:mm:ss"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          helperText={errors.startDate && errors.startDate?.message}
                          error={!!errors.startDate}
                          size="small"
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
                      label={'Ngày kết thúc'}
                      inputFormat="dd-MM-yyyy hh:mm:ss"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          helperText={errors.endDate && errors.endDate?.message}
                          error={!!errors.endDate}
                          size="small"
                        />
                      )}
                    />
                  </Stack>
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={onClose}
              color="inherit"
              variant="contained"
              disabled={isSubmitting}
            >
              {t('order.detail.refundForm.cancel')}
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
            >
              {t('order.detail.export')}
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </div>
  );
};
