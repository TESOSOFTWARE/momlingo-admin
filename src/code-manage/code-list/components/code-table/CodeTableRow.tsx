import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import en from '../../../../common/locales/en';
import { ActiveChip, InActiveChip } from '../../../code-edit/components/StatusChip';
import { fDayDMY } from '../../../code-common/utils/formatTime';
import { IPropsTableRow } from '../../list.interface';

export default function CodeTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: IPropsTableRow) {
  const { code, status, useTime, createdAt } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const checkCodeStatus = () => {
    if (row.status === 'ACTIVE') {
      return true;
    }
    return false;
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>
          <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
        </TableCell>
        <TableCell align="center">{code}</TableCell>
        <TableCell align="center">{useTime}</TableCell>
        <TableCell align="center">{fDayDMY(createdAt)}</TableCell>
        <TableCell align="center">
          {checkCodeStatus() ? <ActiveChip /> : <InActiveChip />}
        </TableCell>
        <TableCell align="right">
          <TableMoreMenu
            open={openMenu}
            onClose={handleCloseMenu}
            onOpen={handleOpenMenu}
            actions={
              <>
                <MenuItem
                  onClick={() => {
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
                    onEditRow();
                    handleCloseMenu();
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
    </>
  );
}
