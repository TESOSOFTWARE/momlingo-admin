import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { FormProvider, RHFTextField } from '../../../../common/components/hook-form';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DEFAULT_REFUND_FORM } from '../../constant';
import useShowSnackbar from '../../../../common/hooks/useMessage';
import useRefundPointOrder from '../../hooks/useRefundCoin';
import { useParams } from 'react-router-dom';
import { dispatch } from '../../../../common/redux/store';

type ConfirmModalType = 'delete' | 'warning';
type ConfirmModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  onSubmit?: VoidFunction;
};

export const RefundCoinModal = (props: ConfirmModalProps) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  const methods = useForm<any>({
    // resolver: yupResolver(),
    defaultValues: DEFAULT_REFUND_FORM,
  });
  const { id: orderId } = useParams();

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;
  const { showSuccessSnackbar, showErrorSnackbar } = useShowSnackbar();

  const { mutate } = useRefundPointOrder({
    onSuccess: () => {
      showSuccessSnackbar('Hoàn xu thành công !');
    },
    onError: () => {
      showErrorSnackbar('Hoàn xu thất bại !');
    },
  });
  const onSubmit = (data: any) => {
    const dataRefund = {
      id: parseInt(orderId as string),
      data: {
        refundPoint: data?.refundPoint,
        content: data?.content,
      },
    };
    mutate(dataRefund);
    onClose();
  };
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
        maxWidth={'lg'}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            sx={{ mb: 2, textTransform: 'uppercase', justifyContent: 'space-between' }}
          >
            {t('order.detail.refundForm.title')}
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
            <Stack spacing={2} paddingY={2}>
              <RHFTextField
                name="refundPoint"
                label={t('order.detail.refundForm.quantity')}
              />
              <RHFTextField name="content" label={t('order.detail.refundForm.content')} />
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
              {t('order.detail.refund')}
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </div>
  );
};
