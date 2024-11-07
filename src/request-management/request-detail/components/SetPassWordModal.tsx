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
import vn from '../../../common/locales/vn';
import {
  dataPassWord,
  isSetPassword,
  setIsSetPassword,
  setPassWord,
} from '../../requestManage.slice';
import { usePostApprove } from '../hooks/usePostApprove';
import { useRejectDownload } from '../hooks/useRejectDownload';
import { paramsReject } from '../interface';

type rejectProps = {
  fileId: number;
};
export default function SetPassWordModal(props: rejectProps) {
  const { fileId } = props;
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();

  const passWord = useSelector(dataPassWord);
  const confirmPopup = useSelector(isSetPassword);
  const handleClose = () => {
    dispatch(setIsSetPassword(false));
  };

  return (
    <>
      <Dialog
        open={confirmPopup}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Đặt mật khẩu File'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Nhập mật khẩu file
          </DialogContentText>
          <DialogContentText>
            <TextField
              name="password"
              onChange={(event) => dispatch(setPassWord(event.target.value))}
              sx={{ width: '100%' }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: 450 }}>
          {/* <LoadingButton variant="contained" onClick={handleApproveFile}>
            Lưu lại
          </LoadingButton> */}
          <Button variant="contained" color="inherit" onClick={handleClose}>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
