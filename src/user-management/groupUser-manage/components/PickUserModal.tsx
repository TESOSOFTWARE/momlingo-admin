import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Stack } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import PickUserDashBoard from './PickUserTable/PickUserDashboard';

type ConfirmModalType = 'delete' | 'warning';
type ConfirmModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  onSubmit?: VoidFunction;
};

export const PickUserModal = (props: ConfirmModalProps) => {
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
        <DialogTitle sx={{ mb: 5, textTransform: 'uppercase' }}>
          {t('groupUser.form.pickUser')} thêm vào nhóm
        </DialogTitle>
        <DialogContent>
          <PickUserDashBoard onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
