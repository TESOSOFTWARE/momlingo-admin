import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie';
import * as animationData from '../animations/success-animation.json';

export default function ApprovedNotification() {
  const { t } = useTranslation();
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
  };
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          marginTop: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Lottie
          options={defaultOptions}
          height={300}
          width={300}
          isStopped={false}
          isPaused={false}
        />
      </Box>
      <Box>
        <Typography sx={{ fontSize: '24px' }}>{t('infoSendSuccessfully')}</Typography>
        <Typography sx={{ fontSize: '18px' }}>
          {t('pleaseWaitForAdminApproveAccount')}
        </Typography>
      </Box>
    </Box>
  );
}
