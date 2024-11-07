import { Checkbox, MenuItem, TableCell, TableRow, Typography, Chip } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../../common/components/Iconify';
import { TableMoreMenu } from '../../../../common/components/table';
import { formatDate } from '../../../../common/constants/common.utils';
import { PATH_DASHBOARD } from '../../../../common/routes/paths';
import { replacePathParams } from '../../../../common/utils/replaceParams';
import { IPropsTableRow } from './common/interfaces';
import { renderOrderStatus } from './utils/renderOrderStatus';
import { STATUS_ORDER_GIFT_STYLE } from './common/constants';

export default function HistoryGiftTableRow({
  row,
  selected,
  onSelectRow,
  onEditRow,
  onDetailRow,
}: IPropsTableRow) {
  const { id, createdAt, expressDeliveryCode, user, status, type } = row;
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleClickDetail = (id: number) => {
    navigate(replacePathParams(PATH_DASHBOARD.order_management.detail, { id: id }));
  };

  return (
    <>
      <TableRow
        hover
        selected={selected}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            fontStyle: 'italic',
          },
        }}
      >
        <TableCell align="center" padding="checkbox">
          <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
        </TableCell>
        <TableCell
          align="center"
          sx={{ minWidth: '100px' }}
          onClick={() => handleClickDetail(id)}
        >
          {id}
        </TableCell>
        <TableCell
          align="center"
          sx={{ minWidth: '100px' }}
          onClick={() => handleClickDetail(id)}
        >
          {user?.customer?.phoneNumber}
        </TableCell>
        <TableCell
          align="center"
          sx={{ minWidth: '140px' }}
          onClick={() => handleClickDetail(id)}
        >
          {formatDate(createdAt)}
        </TableCell>
        <TableCell
          align="center"
          onClick={() => handleClickDetail(id)}
          sx={{ fontWeight: 'bold' }}
        >
          {expressDeliveryCode ? (
            expressDeliveryCode
          ) : (
            <Typography color="grey">Không có</Typography>
          )}
        </TableCell>
        <TableCell align="center" sx ={{ fontWeight: 'bold'}}>{type}</TableCell>
        <TableCell align="center">
          <Chip
            sx={{
              minWidth: 120,
              background: STATUS_ORDER_GIFT_STYLE[status].color,
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '8px',
            }}
            label= {STATUS_ORDER_GIFT_STYLE[status].label}
          />
        </TableCell>
        <TableCell align="center">
          <TableMoreMenu
            open={openMenu}
            onClose={handleCloseMenu}
            onOpen={handleOpenMenu}
            actions={
              <>
                <MenuItem
                  onClick={() => {
                    onEditRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={'eva:edit-fill'} />
                  Sửa
                </MenuItem>
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
