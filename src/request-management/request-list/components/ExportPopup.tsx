import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { FORMAT_DATE_FILTER } from 'src/common/constants/common.constants';
import { dispatch } from 'src/common/redux/store';
import {
  idFile,
  isExportPopup,
  loading,
  nameFile,
  setExportPopup,
  setExportSuccess,
  setLoading,
} from '../../../request-management/request-list/list-slice';
import { exportQRCode } from '../../../request-management/request-list/service';
import useMessage from 'src/common/hooks/useMessage';

export default function ExportPopup() {
  const confirmPopupExport = useSelector(isExportPopup);
  const isLoading = useSelector(loading);
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();
  const fileId = useSelector(idFile);
  const getNameFile = useSelector(nameFile);
  const handleExportFile = async () => {
    dispatch(setLoading(true));
    const dataResult = exportQRCode(fileId)
      .then((res: any) => {
        const fileLink = document.createElement('a');
        // const fileName = `${getNameFile}.xls`;
        fileLink.href = res?.url;
        // fileLink.download = fileName;
        fileLink.click();
        dispatch(setLoading(false));
        dispatch(setExportSuccess(true));
        handleClose();
      })
      .catch((error) => {
        showErrorSnackbar(error?.response?.data?.message);
        console.log(error);
      });
  };

  const handleClose = () => {
    dispatch(setExportPopup(false));
  };

  return (
    <>
      <Dialog
        open={confirmPopupExport}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Xuất File'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có muốn xuất file này ra không?
          </DialogContentText>
          <DialogContentText>File Id: {fileId}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: 450 }}>
          <LoadingButton
            variant="contained"
            loading={isLoading}
            onClick={handleExportFile}
          >
            Xuất File
          </LoadingButton>
          <Button variant="contained" color="inherit" onClick={handleClose}>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
