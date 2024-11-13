import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogSlideProps {
  open: boolean;  // The open state of the dialog passed from parent
  onClose: () => void;  // Callback to close the dialog
  onStatusChange: (status: 'agree' | 'disagree') => void;  // Callback to send status to parent
}

export default function AlertDialogSlide({
  open,
  onClose,
  onStatusChange,
}: AlertDialogSlideProps) {

  const handleAgree = () => {
    onStatusChange('agree');
    onClose();  // Close the dialog
  };

  const handleDisagree = () => {
    onStatusChange('disagree');
    onClose();  // Close the dialog
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Bạn Xác Nhận?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Bạn có muốn xoá nội dung được chọn. Không thể khôi phục hành động này
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree}>Không đồng ý</Button>
        <Button onClick={handleAgree}>Đồng ý</Button>
      </DialogActions>
    </Dialog>
  );
}
