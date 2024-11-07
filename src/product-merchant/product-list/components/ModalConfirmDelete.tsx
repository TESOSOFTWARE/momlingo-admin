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
import { useSelector } from 'react-redux';
import useMessage from '../../../common/hooks/useMessage';
import en from '../../../common/locales/en';
import vn from '../../../common/locales/vn';
import { dispatch } from '../../../common/redux/store';
import { useDeleteProduct } from '../hooks/useDeleteProduct';
import { isPopup, listIdDelete, setPopup } from '../product-slice';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalConfirmDelete() {
  const confirmPopup = useSelector(isPopup);
  const selectIds = useSelector(listIdDelete);
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate: mutationDelete } = useDeleteProduct({
    onSuccess: () => {
      showSuccessSnackbar(vn.ListProduct.deleteSuccess);
    },
    onError: () => {
      showErrorSnackbar(vn.ListProduct.deleteFail);
    },
  });
  const handleDeleteCode = () => {
    mutationDelete({ ids: selectIds });
    dispatch(setPopup(false));
  };
  const handleClose = () => {
    dispatch(setPopup(false));
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
        <DialogTitle sx={{ marginBottom: '20px' }}>
          {vn.ListProduct.deletePopup}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {vn.ListProduct.confirmDelete}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: 450 }}>
          <Stack spacing={3} direction="row">
            <Button variant="contained" color="error" onClick={handleDeleteCode}>
              {vn.ListProduct.delete}
            </Button>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              {vn.ListProduct.cancel}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}
