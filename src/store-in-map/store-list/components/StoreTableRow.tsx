import { TableRow, TableCell, MenuItem, Checkbox } from '@mui/material';
import { useState } from 'react';
import Iconify from '../../../common/components/Iconify';
import { TableMoreMenu } from '../../../common/components/table';
import en from '../../../common/locales/en';
import { dispatch } from '../../../common/redux/store';
import { IPropStoreTableRow } from '../interface';
import { setIsOpenPopupDelete } from '../storeInMap.slice';

export default function StoreTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: IPropStoreTableRow) {
  const [openMenu, setOpenMenu] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };
  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>
      <TableCell align="center">{row.id}</TableCell>
      <TableCell align="center">{row.name}</TableCell>
      <TableCell align="center">{row.address}</TableCell>
      <TableCell align="center">({row.long} , {row.lat})</TableCell>
      <TableCell align="center">
        <TableMoreMenu
          open={openMenu}
          onClose={handleCloseMenu}
          onOpen={handleOpenMenu}
          actions={
            <>
              <MenuItem
                onClick={(e) => {
                  dispatch(setIsOpenPopupDelete(true))
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                {en.delete}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  onEditRow();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                {en.edit}
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
