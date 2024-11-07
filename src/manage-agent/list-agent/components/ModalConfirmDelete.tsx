import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Stack,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useMessage from '../../../common/hooks/useMessage';
import vn from '../../../common/locales/vn';
import { dispatch } from '../../../common/redux/store';
import { useDeleteAgent } from '../hooks/useDeleteAgent';
import { idDel, popup, setDeletePopup } from '../slice';

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
  const isDeletePopup = useSelector(popup);
  const idsDelete = useSelector(idDel);
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate } = useDeleteAgent({
    onSuccess: () => {
      showSuccessSnackbar(t('manageAgent.list.successBar'));
    },
    onError: () => {
      showErrorSnackbar(t('manageAgent.list.failBar'));
    },
  });
  const handleDeleteCode = () => {
    mutate(idsDelete);
    dispatch(setDeletePopup(false));
  };
  const handleClose = () => {
    dispatch(setDeletePopup(false));
  };

  return (
    <>
      <Dialog
        open={isDeletePopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ marginBottom: '20px' }}>
          {t('manageAgent.list.modalTitle')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t('manageAgent.list.modalContent')}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: 450 }}>
          <Stack spacing={3} direction="row">
            <Button variant="contained" color="error" onClick={handleDeleteCode}>
              {t('delete')}
            </Button>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              {t('cancel')}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}
