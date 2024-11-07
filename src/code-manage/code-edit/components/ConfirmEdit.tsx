import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dispatch } from 'src/common/redux/store';
import useMessage from '../../../common/hooks/useMessage';
import en from '../../../common/locales/en';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { dataEditCode, showPopup, setPopup } from '../../code-common/code.slice';
import { useEditCode } from '../hooks/useEditCode';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmEdit() {
  const confirmPopupEdit = useSelector(showPopup);
  const editCode = useSelector(dataEditCode);
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isSuccess } = useEditCode({
    onSuccess: () => {
      showSuccessSnackbar(en.successEdit);
    },
    onError: () => {
      showErrorSnackbar(en.errorEdit);
    },
  });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.code.list);
  }, [isSuccess]);

  const handleEditCode = () => {
    mutate({ data: editCode });
    dispatch(setPopup(false));
  };

  const handleClose = () => {
    dispatch(setPopup(false));
  };

  return (
    <>
      <Dialog
        open={confirmPopupEdit}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{en.saveChange}</DialogTitle>
        <DialogContent>
          <DialogContentText>{en.confirmChange}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: 450 }}>
          <Button variant="contained" color="error" onClick={handleEditCode}>
            {en.saveChange}
          </Button>
          <Button variant="contained" color="inherit" onClick={handleClose}>
            {en.cancel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
