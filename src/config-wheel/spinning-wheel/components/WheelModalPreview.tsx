import { Box, Modal } from '@mui/material';
import WheelComponent from './Wheel';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  editWheelImage?: string;
}

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderColor: 'common.white',
  p: 4,
};
export default function PreviewWheelModal({
  isOpen,
  onClose,
  editWheelImage,
}: ConfirmModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiBox-root': {
          width: '499.07px',
          borderRadius: '19.8305px',
        },
      }}
    >
      <Box sx={style}>
        <WheelComponent editWheelImage={editWheelImage} />
      </Box>
    </Modal>
  );
}
