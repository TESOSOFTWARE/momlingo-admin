import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dispatch } from 'src/common/redux/store';
import useMessage from '../../../common/hooks/useMessage';
import en from '../../../common/locales/en';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { dataPostCode, showPopup, setPopup } from '../../code-common/code.slice';
import { usePostCode } from '../hooks/usePostCode';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmCreate() {
  const { t } = useTranslation();
  const confirmPopup = useSelector(showPopup);
  const createCode = useSelector(dataPostCode);
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isSuccess } = usePostCode({
    onSuccess: () => {
      showSuccessSnackbar(t('successEdit'));
    },
    onError: () => {
      showErrorSnackbar(t('errorEdit'));
    },
  });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.code.list);
  }, [isSuccess]);

  const handleCreateCode = () => {
    mutate({ data: createCode });
    dispatch(setPopup(false));
  };

  const handleClose = () => {
    dispatch(setPopup(false));
  };

  return (
    <>
      <Dialog
        open={confirmPopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{t('saveChange')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('confirmChange')}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width: 450 }}>
          <Button variant="contained" color="error" onClick={handleCreateCode}>
            {t('saveChange')}
          </Button>
          <Button variant="contained" color="inherit" onClick={handleClose}>
            {t('cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
