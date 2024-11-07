import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useMessage from '../../../common/hooks/useMessage';
import { dispatch } from '../../../common/redux/store';
import { useDeleteVariant } from '../hooks/useDeleteVariant';
import { isPopup, selectId, setIsPopup } from '../slice';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalConfirmDelete() {
  const { t } = useTranslation();
  const confirmPopup = useSelector(isPopup);
  const selectIds = useSelector(selectId);
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate: mutationDelete, isLoading } = useDeleteVariant({
    onSuccess: () => {
      showSuccessSnackbar(t('attribute.list.deleteSuccess'));
    },
    onError: () => {
      showErrorSnackbar(t('attribute.list.deleteFail'));
    },
  });
  const handleDeleteCode = () => {
    mutationDelete({ ids: selectIds });
    dispatch(setIsPopup(false));
  };
  const handleClose = () => {
    dispatch(setIsPopup(false));
  };

  return (
    <>
      <Dialog
        open={confirmPopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{t('attribute.list.deleteTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t('attribute.list.deleteContent')}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: 450 }}>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="error"
            onClick={handleDeleteCode}
          >
            {t('delete')}
          </LoadingButton>
          <Button variant="contained" color="inherit" onClick={handleClose}>
            {t('cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
