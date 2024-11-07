import { Button, Chip, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../common/constants/common.utils';
import { StatusDuplicateScan } from '../../constants';
import {
  idPickedSelector,
  isOpenActiveDuplicateSelector,
  setIdPicked,
  setIsOpenModalActiveDuplicate,
  setUnBlock,
  unBlockSelector,
} from '../../historyScan.slice';
import { IPropsDuplicateTableRow } from '../../interfaces';
import { ConfirmModal } from '../../../common/components/modal/ConfirmModal';
import useShowSnackbar from '../../../common/hooks/useMessage';
import { useActiveDuplicateCode } from '../../hooks/useEditDuplicateScan';
import { ConfirmActiveModal } from './modal/ModalActive';
import { LoadingButton } from '@mui/lab';

export default function DuplicateScanTableRow({
  row,
  isRefetching,
}: IPropsDuplicateTableRow) {
  const { id, code, status, phoneNumber, unBLockScanDup, createdAt } = row;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const { showSuccessSnackbar, showErrorSnackbar } = useShowSnackbar();

  const isOpenModal = useSelector(isOpenActiveDuplicateSelector);
  const idPicked = useSelector(idPickedSelector);
  const isUnblock = useSelector(unBlockSelector);

  const { mutate, isLoading } = useActiveDuplicateCode({
    onSuccess: () => {
      showSuccessSnackbar(
        isUnblock ? 'Khóa mã trùng thành công !' : 'Mở mã trùng thành công !'
      );
    },
    onError: () => {
      showErrorSnackbar('Thất bại !');
    },
  });

  const handleOpenActive = (idRow: number, unBLock: boolean) => {
    dispatch(setIdPicked(idRow));
    dispatch(setUnBlock(unBLock));
    dispatch(setIsOpenModalActiveDuplicate(true));
  };

  const onUnblock = () => {
    const data = {
      id: idPicked,
      data: {
        isUnBLock: !isUnblock,
      },
    };
    mutate(data);
  };

  return (
    <>
      <TableRow hover>
        <TableCell align="center">{id}</TableCell>
        <TableCell
          align="center"
          sx={{
            '&:hover': { color: '#D5B4B4', cursor: 'pointer' },
            color: 'red',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {code}
        </TableCell>
        <TableCell align="center">{phoneNumber}</TableCell>
        {/* <TableCell align="center">
          <Chip
            label={status}
            sx={{
              color: 'white',
              minWidth: '100px',
              fontWeight: 900,
              borderRadius: '5px',
              background:
                status === StatusDuplicateScan.SUCCESS
                  ? 'linear-gradient(to left top, #C0EEF2, #03C988)'
                  : 'linear-gradient(to left bottom, #F55050, #FFACAC)',
            }}
          />
        </TableCell> */}
        <TableCell align="center">{formatDate(createdAt)}</TableCell>

        <TableCell align="center">
          <LoadingButton
            loading={isRefetching}
            variant="contained"
            sx={{
              textShadow: isRefetching ? 'none' : '0.5px 0.5px #9DB2BF',
              fontWeight: 'bold',
              minWidth: '100px',
              borderRadius: '5px',
              boxShadow: 3,
              cursor: 'pointer',
              textTransform: 'uppercase',
              background: !unBLockScanDup
                ? 'linear-gradient(to left top, #C0EEF2, #03C988)'
                : 'linear-gradient(to left top, #FF9EAA, #FFD0D0)',
            }}
            onClick={() => handleOpenActive(id, unBLockScanDup)}
          >
            {unBLockScanDup ? 'Deactivate' : 'Activate'}
          </LoadingButton>
        </TableCell>
      </TableRow>
      <ConfirmActiveModal
        isLoading={isLoading}
        isOpen={isOpenModal}
        onClose={() => dispatch(setIsOpenModalActiveDuplicate(false))}
        onSubmit={onUnblock}
      />
    </>
  );
}
