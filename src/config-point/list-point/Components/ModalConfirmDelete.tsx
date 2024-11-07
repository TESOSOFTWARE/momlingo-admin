import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from 'src/common/redux/store';
import useMessage from '../../../common/hooks/useMessage';
import en from '../../../common/locales/en';
import { useDeletePoint } from '../hooks/useDeletePoint';
import { deletePoint, setPopupDel, showPopupDel } from '../slice';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalConfirmDelete() {
  const isPopupDel = useSelector(showPopupDel);
  const delPoint = useSelector(deletePoint);
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate } = useDeletePoint({
    onSuccess: () => {
      showSuccessSnackbar(en.deleteCodeSuccess);
    },
    onError: () => {
      showErrorSnackbar(en.deleteCodeFail);
    },
  });
  const handleDelete = () => {
    mutate(delPoint);
    dispatch(setPopupDel(false));
  };
  const handleClose = () => {
    dispatch(setPopupDel(false));
  };

  return (
    <>
      <Dialog
        open={isPopupDel}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Xóa mã'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {'Bạn có chắc chắn muốn xóa mã này?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: 450 }}>
          <Button variant="contained" color="error" onClick={handleDelete}>
            {'Xóa'}
          </Button>
          <Button variant="contained" color="inherit" onClick={handleClose}>
            {'Hủy'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
