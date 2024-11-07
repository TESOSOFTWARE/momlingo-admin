import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useMessage from 'src/common/hooks/useMessage';
import { dispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { usePostReject } from '../hooks/usePostReject';
import { paramsReject } from '../interface';
import { dataPassWord, isPopup, setPopup, setPassWord } from '../../requestManage.slice';

type rejectProps = {
  fileId: number;
};
export default function RejectModalPopup({ fileId }: rejectProps) {
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();
  const navigate = useNavigate();
  const { mutate: mutateReject } = usePostReject(
    {
      onSuccess: () => showSuccessSnackbar('Từ chối file thành công'),
      onError: () => showErrorSnackbar('Từ chối file thất bại'),
    },
    fileId
  );
  const rejectDescription = useSelector(dataPassWord);

  const confirmPopup = useSelector(isPopup);
  const handleClose = () => {
    dispatch(setPopup(false));
  };
  const handleReject = () => {
    const dataReject: paramsReject = {
      reason: rejectDescription,

      fileId: parseInt(fileId.toString()),
    };
    mutateReject(dataReject);
    dispatch(setPopup(false));
  };

  return (
    <>
      <Dialog
        open={confirmPopup}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Từ chối duyệt file'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Mô tả lí do từ chối duyệt file
          </DialogContentText>
          <DialogContentText>
            <TextField
              name="rejectDes"
              onChange={(event) => dispatch(setPassWord(event.target.value))}
              sx={{ width: '100%' }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: 450 }}>
          <LoadingButton variant="contained" onClick={handleReject}>
            Lưu lại
          </LoadingButton>
          <Button variant="contained" color="inherit" onClick={handleClose}>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
