import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Stack,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dispatch, useSelector } from '../../../../common/redux/store';
import { noticeReset, setPopupVariant, setReset } from '../../slice';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NoticeResetSelect() {
  const { t } = useTranslation();
  const confirmPopup = useSelector(noticeReset);

  const handleClose = () => {
    dispatch(setReset(0));
  };
  const handleReturn = () => {
    dispatch(setReset(0));
  };
  const handleCancel = () => {
    dispatch(setReset(2));
    dispatch(setPopupVariant(false));
  };

  return (
    <>
      <Dialog
        open={confirmPopup === 1 ? true : false}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle
          sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}
        >
          {t('productMerchant.new.labelNotice')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('productMerchant.new.contentReset')} <br />
            {t('productMerchant.new.contentReset2')}
          </DialogContentText>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              marginTop: 6,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button onClick={handleCancel} variant="contained">
              {t('productMerchant.new.labelCancel')}
            </Button>
            <Button onClick={handleReturn} variant="contained" color="inherit">
              {t('productMerchant.new.labelReturn')}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
