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
import { dataDeleteCode, showPopup, setPopup } from '../../code-common/code.slice';
import { useDeleteCode } from '../hooks/useDeleteCode';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalConfirmDelete() {
  const confirmPopup = useSelector(showPopup);
  const selectCodesDelete = useSelector(dataDeleteCode);
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const mutationDelete = useDeleteCode({
    onSuccess: () => {
      showSuccessSnackbar(en.deleteCodeSuccess);
    },
    onError: () => {
      showErrorSnackbar(en.deleteCodeFail);
    },
  });
  const handleDeleteCode = () => {
    for (let i = 0; i < selectCodesDelete.length; i++) {
      mutationDelete.mutate(selectCodesDelete[i]);
    }
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
        <DialogTitle>{'Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {en.confirmDelete}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: 450 }}>
          <Button variant="contained" color="error" onClick={handleDeleteCode}>
            {en.delete}
          </Button>
          <Button variant="contained" color="inherit" onClick={handleClose}>
            {en.cancel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
