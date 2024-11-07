import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { dispatch, useSelector } from '../../../common/redux/store';
import { idPickedSelector, setConfirmDeleteModalStatus } from '../../manageStore.slice';
import { useDeleteStore } from '../../hooks/useDeleteStore';

export const DeleteStoreModal = () => {
  const { confirmDeleteModalStatus } = useSelector((state) => state.manageStore);
  const idDelete = useSelector(idPickedSelector);

  const { mutate } = useDeleteStore();

  const onSubmit = () => {
    mutate(idDelete);
    dispatch(setConfirmDeleteModalStatus(false));
  };

  return (
    <Dialog
      open={confirmDeleteModalStatus}
      fullWidth
      maxWidth="sm"
      onClose={() => dispatch(setConfirmDeleteModalStatus(false))}
    >
      <DialogContent sx={{ width: '100%' }}>
        <DialogContentText sx={{ marginBottom: '10px' }}>
          Bạn có chắc muốn xóa cửa hàng này?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="button" variant="contained" onClick={onSubmit}>
          Xác nhận
        </Button>
        <Button
          onClick={() => {
            dispatch(setConfirmDeleteModalStatus(false));
          }}
          variant="contained"
          color="inherit"
        >
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};
