import { Checkbox, MenuItem, TableCell, TableRow, Chip } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../../common/components/Iconify';
import { TableMoreMenu } from '../../../../common/components/table';
import { formatDate } from '../../../../common/constants/common.utils';
import { PATH_DASHBOARD } from '../../../../common/routes/paths';
import { replacePathParams } from '../../../../common/utils/replaceParams';
import { renderNull } from '../../../common/utils/renderValue';
import { IPropsTableRow } from '../../interface';
import { renderOrderStatus } from '../../utils/renderOrderStatus';
import { STATUS_ORDER_GIFT_STYLE } from '../../../common/constants';

export default function OrderTableRow({
  row,
  selected,
  onSelectRow,
  onEditRow,
  onDetailRow,
}: IPropsTableRow) {
  const { id, createAt, expressDeliveryCode, phoneUser, orderStatus } = row;
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
          {phoneUser}
        </TableCell>
        <TableCell
          align="center"
          sx={{ minWidth: '140px' }}
          onClick={() => handleClickDetail(id)}
        >
          {formatDate(createAt)}
        </TableCell>
        <TableCell align="center" onClick={() => handleClickDetail(id)}>
          {expressDeliveryCode ? (
            expressDeliveryCode
          ) : (
            <b>
              <i>Không có</i>
            </b>
          )}
        </TableCell>
        <TableCell align="center">
          <Chip
            sx={{
              minWidth: 120,
              background: STATUS_ORDER_GIFT_STYLE[orderStatus].color,
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '8px',
            }}
            label={STATUS_ORDER_GIFT_STYLE[orderStatus].label}
          />
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
