import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { unBlockSelector } from '../../../historyScan.slice';

type ConfirmModalType = 'delete' | 'warning';
type ConfirmModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
  isLoading?: boolean;
};
const mapTypeToColor: Record<
  ConfirmModalType,
  | 'error'
  | 'success'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'warning'
  | undefined
> = {
  delete: 'error',
  warning: 'warning',
};

export const ConfirmActiveModal = (props: ConfirmModalProps) => {
  const { isOpen, onClose, onSubmit, isLoading } = props;
  const { t } = useTranslation();
  const unblockStatusRow = useSelector(unBlockSelector);
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        BackdropProps={{
          sx: { backgroundColor: 'black!important', opacity: '0.2!important' },
        }}
        PaperProps={{
          sx: {
            boxShadow: 0,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {unblockStatusRow
            ? 'Bạn có chắc muốn khóa mã này ?'
            : 'Bạn có chắc muốn mở khóa mã này ?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('confirmModal.content')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit" variant="contained">
            {t('confirmModal.cancel')}
          </Button>
          <LoadingButton
            loading={isLoading}
            onClick={() => {
              onSubmit();
              onClose();
            }}
            color={unblockStatusRow ? 'error' : 'success'}
            autoFocus
            variant="contained"
          >
            {unblockStatusRow ? 'Khóa' : 'Mở khóa'}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
