import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Portal,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Iconify from '../../../../common/components/Iconify';
import { dispatch } from '../../../../common/redux/store';
import VariantTable from '../../../product-common/components/VariantTable/TableNew/VariantTable';
import { selectVariantIds } from '../../../product-common/slice';
import {
  setAddVariantId,
  setNotice,
  setPopupVariant,
  setReset,
  showPopupVariant,
} from '../../slice';
import NoticeOnlyVariant from './NoticeOnlyVariant';
import NoticeResetSelect from './NoticeResetSelect';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type dataVariantProps = {
  checkType: string;
};

export default function ModalAddVariant({ checkType }: dataVariantProps) {
  const { t } = useTranslation();
  const idVariant = useSelector(selectVariantIds);
  const confirmPopup = useSelector(showPopupVariant);

  const handleClose = () => {
    dispatch(setReset(1));
  };

  const handleAdd = () => {
    if (checkType === 'SIMPLE' || checkType === 'VIRTUAL') {
      if (idVariant.length > 1) {
        dispatch(setNotice(true));
      }
      if (idVariant.length === 1) {
        dispatch(setAddVariantId(idVariant));
        dispatch(setPopupVariant(false));
      }
    } else {
      dispatch(setAddVariantId(idVariant));
      dispatch(setPopupVariant(false));
    }
  };

  return (
    <>
      <Portal>
        <NoticeOnlyVariant type={checkType} />
        <NoticeResetSelect />
      </Portal>
      <Dialog
        open={confirmPopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        PaperProps={{
          style: {
            width: '850px',
          },
        }}
      >
        <Iconify
          sx={{ position: 'absolute', top: 8, right: 8, fontSize: '25px', opacity: 0.6 }}
          icon="icon-park-solid:handle-x"
          onClick={handleClose}
        />
        <DialogTitle
          sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}
        >
          {t('productMerchant.new.addVariant')}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <VariantTable />
          </DialogContentText>
        </DialogContent>

        <DialogActions
          sx={{
            display: 'flex',
            justifyItems: 'flex-end',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          <Button size="medium" variant="contained" onClick={handleAdd}>
            {t('productMerchant.new.add')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
