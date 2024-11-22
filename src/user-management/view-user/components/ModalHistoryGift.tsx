import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import HistoryScanDashBoard from '../../../history-scan/components/HistoryScanDashboard';
import HistoryGiftForm from './historyGiftUser';
// import OrderForm from '../../../order-management/list-order/components/OrderForm';

type ConfirmModalType = 'delete' | 'warning';
type ConfirmModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  onSubmit?: VoidFunction;
  userId?: number;
};

export const HistoryGiftModal = (props: ConfirmModalProps) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        BackdropProps={{
          sx: { backgroundColor: 'black!important', opacity: '0.2!important' },
        }}
        PaperProps={{
          sx: { boxShadow: 0 },
        }}
        fullWidth
        maxWidth={'xl'}
      >
        <DialogTitle
          sx={{ mb: 5, textTransform: 'uppercase', justifyContent: 'space-between' }}
        >
          Lịch sử đổi quà của người dùng
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <HistoryGiftForm searchUserId={props?.userId} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
