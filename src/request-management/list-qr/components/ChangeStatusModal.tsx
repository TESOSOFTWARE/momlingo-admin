import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useSelector, dispatch } from 'src/common/redux/store';
import { setModalChangeStatus, setQrSelected } from '../qrCode.slice';
import useMessage from 'src/common/hooks/useMessage';

type Props = {
  handleChangeStatus: () => void;
};

export default function ChangeStatusModal({ handleChangeStatus }: Props) {
  const stateRedux = useSelector((state) => state.qrCode);

  return (
    <Dialog
      open={stateRedux.modalChangeStatus}
      fullWidth
      maxWidth="sm"
      onClose={() => {
        dispatch(setModalChangeStatus(false));
      }}
    >
      <DialogTitle>Change Status</DialogTitle>
      <DialogContent sx={{ width: '100%' }}>
        <DialogContentText sx={{ marginBottom: '10px' }}>
          Do you want to change status of this QR Code?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="button" variant="contained" onClick={handleChangeStatus}>
          Confirm
        </Button>
        <Button
          onClick={() => {
            dispatch(setModalChangeStatus(false));
          }}
          variant="contained"
          color="inherit"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
