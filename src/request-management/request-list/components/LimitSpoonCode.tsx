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
  isOpenEditSpoonCode,
  isSetPassword,
  limitSpoonCode,
  setIsOpenEditSpoonCode,
  setIsSetPassword,
  setLimitSpoonCode,
  setPassWord,
} from '../../requestManage.slice';
import { usePostApprove } from '../../request-detail/hooks/usePostApprove';
import { useRejectDownload } from '../../request-detail/hooks/useRejectDownload';
import { paramsReject } from '../../request-detail/interface';
import { useEditLimitSpoonCode } from '../hooks/useEditLimitSpoonCode';

type rejectProps = {
  fileId: number;
};
export default function LimitSpoonCode() {
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();

  const passWord = useSelector(limitSpoonCode);
  const confirmPopup = useSelector(isOpenEditSpoonCode);
  const handleClose = () => {
    dispatch(setIsOpenEditSpoonCode(false));
  };
  const { mutate } = useEditLimitSpoonCode({
    onSuccess: () => showSuccessSnackbar('Chỉnh sửa giới hạn thành công'),
    onError: () => showErrorSnackbar('Chỉnh sửa giới hạn thất bại'),
  });
  const handleApproveFile = () => {
    mutate(passWord);
    dispatch(setIsOpenEditSpoonCode(false));
  };
  return (
    <>
      <Dialog
        open={confirmPopup}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Đặt giới hạn mã muỗng theo tháng'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Nhập số lượng giới hạn
          </DialogContentText>
          <DialogContentText>
            <TextField
              name="limit"
              type="number"
              onChange={(event) =>
                dispatch(setLimitSpoonCode(parseInt(event.target.value)))
              }
              sx={{ width: '100%' }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: 450 }}>
          <LoadingButton variant="contained" onClick={handleApproveFile}>
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
