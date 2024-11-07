import { Box, Checkbox, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Iconify from 'src/common/components/Iconify';
import { ITableProps } from '../interfaces';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EditConfigAppModal from './modal/EditConfigAppModal';
import { isOpenModalSelector, pickedRowSelector, setIsOpenModal, setPickedRow } from '../configApp.slice';

export default function ConfigAppTableRow({ row }: ITableProps) {
  const navigate = useNavigate();
  const { id, mobileVersion, deviceType } = row;
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isOpenModalEdit = useSelector(isOpenModalSelector);

  const handleOpenModal = () => {
    dispatch(setIsOpenModal(true));
    dispatch(setPickedRow(row));
  };

  return (
    <>
      <TableRow hover sx={{ borderBottom: '1px dotted gray' }}>
        <TableCell align="center">{id}</TableCell>
        <TableCell
          align="left"
          sx={{
            fontWeight: 'bold',
            '&:hover': { color: '#8294C4' },
          }}
        >
          {deviceType}
        </TableCell>
        <TableCell align="center">{mobileVersion}</TableCell>

        <TableCell align="center">
          <Iconify
            icon={'eva:edit-fill'}
            onClick={handleOpenModal}
            sx={{ cursor: 'pointer', fontSize: '25px' }}
          />
        </TableCell>
      </TableRow>
      <EditConfigAppModal
        isOpen={isOpenModalEdit}
        onClose={() => dispatch(setIsOpenModal(false))}
      /> 
    </>
  );
}
