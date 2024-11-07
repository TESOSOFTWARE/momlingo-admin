import { Box, MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../../../common/components/Iconify';
import { TableMoreMenu } from '../../../../../common/components/table';
import { IPropsTableRow } from '../../../interface';
import { convertToPlain } from '../../../utils/convertToPlain';

export default function ProductInfoTableRow({ row, onDetailRow }: IPropsTableRow) {
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }}>
        <TableCell align="left" sx={{ width: '110px' }}>
          <Box
            component="img"
            sx={{
              height: 50,
              width: 50,
              borderRadius: '7px',
              objectFit: 'cover'
            }}
            alt={row?.product?.productDetails[0]?.name}
            src={`${row?.product?.thumbnail?.url}`}
          />
        </TableCell>

        <TableCell align="center" sx={{ minWidth: '100px' }}>
          {row?.product?.productDetails[0]?.name}
        </TableCell>
        <TableCell align="center" sx={{ minWidth: '100px' }}>
          {row?.quantity}
        </TableCell>
        <TableCell align="center" sx={{ minWidth: '100px' }}>
          {row?.point}
        </TableCell>
        <TableCell align="center" sx={{ minWidth: '100px' }}>
          {row?.price}
        </TableCell>
        <TableCell align="center" sx={{ minWidth: '100px' }}>
          {row?.total}
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
                    onDetailRow();
                    handleCloseMenu();
                  }}
                  sx={{ color: 'secondary.main' }}
                >
                  <Iconify icon={'ci:show'} />
                  Chi tiết
                </MenuItem>
              </>
            }
          />
        </TableCell>
      </TableRow>
    </>
  );
}
