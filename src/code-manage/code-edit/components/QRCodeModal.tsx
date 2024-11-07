import React from 'react';
import { Box, Modal, Button } from '@mui/material';
import QRcode from 'qrcode.react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderColor: 'common.white',
  p: 4,
  width: '380px',
};
interface IQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QRCodeModal({ isOpen, onClose }: IQRCodeModalProps) {
  const { code } = useParams();
  const { t } = useTranslation();

  const handleDownloadQRCode = (codeEvent: string | undefined) => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    const pngUrl = canvas
      ?.toDataURL('image/png')
      ?.replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${codeEvent}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiBox-root': {
          borderRadius: '19.8305px',
        },
      }}
    >
      <Box sx={style}>
        <QRcode id="qr-code" value={code as string} size={320} includeMargin={true} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => handleDownloadQRCode(code)}>
            {t('downloadQRCode')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
