import { MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import Iconify from '../../../common/components/Iconify';
import { TableMoreMenu } from '../../../common/components/table';
import { fCurrency } from '../../../common/utils/formatNumber';
import { IGiftData } from '../../common/interface';

type Props = {
  row: IGiftData;
  onDeleteRow: VoidFunction;
};

export default function GiftTableRow({ row, onDeleteRow }: Props) {
  const [openMenu, setOpenMenu] = useState<HTMLElement | null>(null);
  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  return (
    <TableRow hover>
      <TableCell align="left">{row.id}</TableCell>
      <TableCell align="left">
        <Typography variant="h6" gutterBottom>
          {row.name}
        </Typography>
      </TableCell>
      <TableCell align="left">{fCurrency(row.price)}</TableCell>
      <TableCell align="left">
        <img src={row?.thumbnail?.url} alt={`thumbnail-${row.name}`} width="170px" />
      </TableCell>
      <TableCell align="left">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
