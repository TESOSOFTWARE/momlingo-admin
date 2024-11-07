import {
  Button,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Checkbox,
  Chip,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import { useSelector } from 'react-redux';
import useMessage from 'src/common/hooks/useMessage';
import { useState } from 'react';
import { IPropsTableRow } from '../interfaces';
import { TableMoreMenu } from '../../common/components/table';
import Iconify from '../../common/components/Iconify';
import { formatDate } from '../../common/constants/common.utils';

export default function GameGiftTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: IPropsTableRow) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    id,
    name,
    startDate,
    endDate,
    status,
    ordinal,
    quantity,
    wonQuantity,
    winRate,
    game,
    productVariant,
    gameGiftConstraints,
    gameWinHistories,
  } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const { id: gameId } = useParams();

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const handleClickDetail = () => {
    navigate(PATH_DASHBOARD.gameGift.detail(gameId as string, id.toString()));
  };
  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
        </TableCell>
        <TableCell align="center">{id}</TableCell>
        <TableCell
          align="left"
          onClick={handleClickDetail}
          sx={{
            '&:hover': { color: '#D5B4B4', cursor: 'pointer' },
            color: 'red',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            maxWidth: 200,
            // display: 'inline-block',
            textOverflow: 'ellipsis',
            overflow: 'hidden!important',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </TableCell>
        <TableCell align="center">{ordinal}</TableCell>
        <TableCell align="center">
          <Chip
            label={status}
            sx={{
              color: 'white',
              minWidth: '100px',
              fontWeight: 900,
              borderRadius: '5px',
              background:
                status === 'ACTIVE'
                  ? 'linear-gradient(to left top, #C0EEF2, #03C988)'
                  : 'linear-gradient(to left bottom, #F55050, #FFACAC)',
            }}
          />
        </TableCell>
        <TableCell align="center">{formatDate(startDate)}</TableCell>
        <TableCell align="center">{formatDate(endDate)}</TableCell>

        <TableCell align="center">
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <Stack>
                  <MenuItem
                    onClick={() => {
                      navigate(
                        PATH_DASHBOARD.gameGift.detail(gameId as string, id.toString())
                      );
                    }}
                  >
                    <Iconify icon={'mdi:eye-outline'} />
                    Xem
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate(
                        PATH_DASHBOARD.gameGift.edit(gameId as string, id.toString())
                      );
                    }}
                  >
                    <Iconify icon={'eva:edit-fill'} />
                    Sửa
                  </MenuItem>
                  <MenuItem
                    sx={{ color: 'error.main' }}
                    onClick={() => {
                      onDeleteRow();
                      handleCloseMenu();
                    }}
                  >
                    <Iconify icon={'eva:trash-2-outline'} />
                    Xóa
                  </MenuItem>
                </Stack>
              </>
            }
          />
        </TableCell>
      </TableRow>
    </>
  );
}
