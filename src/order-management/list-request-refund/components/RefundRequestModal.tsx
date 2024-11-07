import { Button, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import { LabelStyle } from '../../../config-share-app/components/BannerConfig';
import { DEFAULT_VALUE_MODAL_FORM } from '../constants';
import { useRequestRefund } from '../hooks/useRequestRefund';
import { IRequestRefundParams } from '../interfaces';
import useMessage from 'src/common/hooks/useMessage'
import { setIsOpenConfirmModal, setReject } from '../slice';
import { useSelector } from '../../../common/redux/store';
import { useRejectRefund } from '../hooks/useRejectRefund';
type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
  orderId:number;
};
export default function RefundRequestModal(prop: Props) {
  const { isOpen, onClose, orderId } = prop;
  const {paramsRefundRequest,reject} =useSelector(state=>state.refundOrderRequest)
  const { t } = useTranslation();
  const methods = useForm<IRequestRefundParams>({
    defaultValues: DEFAULT_VALUE_MODAL_FORM,
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = methods;
  const dispatch = useDispatch();
  const { mutate:mutateRequest, isSuccess } = useRequestRefund(paramsRefundRequest);
  const { mutate:mutateReject, isSuccess :isSuccessReject } = useRejectRefund(paramsRefundRequest);
  useEffect(() => {
    if(isSuccess || isSuccessReject){
    dispatch(setReject(false))
      dispatch(setIsOpenConfirmModal(false));
    }    
  }, [isSuccess]);
  const onSubmitForm = (data: any) => {
    !reject ? mutateRequest({orderId,data}) :mutateReject({orderId,data});
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
          <DialogTitle>Thông tin {!reject ? "hoàn xu" : "từ chối hoàn xu"}</DialogTitle>
          <DialogContent sx={{ marginTop: '20px' }}>
            <Stack spacing={3} >
           <LabelStyle ml="2px" color='red !important' >Mã đơn hàng: {orderId}</LabelStyle>
              {!reject &&(<RHFTextField  label="Số xu" InputLabelProps={{ shrink: true }} type="number" name="refundPoint" />)}
              <RHFTextField  label={!reject ?"Nội dung hoàn xu" :"Nội dung từ chối"} InputLabelProps={{ shrink: true }}  name="content" />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{onClose();reset()}} variant="contained" color="inherit">
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
