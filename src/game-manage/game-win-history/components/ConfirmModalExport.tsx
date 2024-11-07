import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { isOpenModalExport, setIsOpenModalRequestExport } from '../slice';
import { useDispatch } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function ConfirmModalExport() {
  const { t } = useTranslation();
  const isOpen = useSelector(isOpenModalExport);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setIsOpenModalRequestExport(false));
  };

  const handleAgree = () => {
    handleClose();
    navigate(PATH_DASHBOARD.fileManage.listFileExport);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('userManage.export.titleConfirmExport')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('userManage.export.subtitleConfirmExport')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" variant="contained">
            {t('userManage.export.closeConfirmExport')}
          </Button>
          <Button onClick={handleAgree} autoFocus color="warning" variant="contained">
            {t('userManage.export.agreeConfirmExport')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
