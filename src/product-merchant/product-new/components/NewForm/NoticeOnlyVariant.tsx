import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dispatch, useSelector } from '../../../../common/redux/store';
import { renderTypeName } from '../../../product-common/utils/renderTypeName';
import { notice, setNotice } from '../../slice';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type NoticeProps = {
  type: string;
};

export default function NoticeOnlyVariant({ type }: NoticeProps) {
  const { t } = useTranslation();
  const confirmPopup = useSelector(notice);

  const handleClose = () => {
    dispatch(setNotice(false));
  };

  return (
    <>
      <Dialog
        open={confirmPopup}
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
            {t('productMerchant.new.contentOnly1')} <i>"{renderTypeName(type)}"</i>
            {t('productMerchant.new.contentOnly2')} <br />
            {t('productMerchant.new.contentOnly3')}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
