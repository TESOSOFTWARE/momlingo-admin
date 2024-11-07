import {
  TableCell,
  Checkbox,
  MenuItem,
  TableRow as MuiTableRow,
  Typography,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { fDateTime24h } from 'src/common/utils/formatTime';
import Label, { LabelColor } from '../../../common/components/Label';
import { EventStatus } from '../../common/enums';
import { TableRowProps } from '../../common/interfaces';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

const mapStatusToColor: Record<EventStatus, LabelColor> = {
  DRAFT: 'default',
  CLOSED: 'error',
  PUBLISHED: 'success',
};

export function TableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: TableRowProps) {
  const { id, type, status , name, startDate, endDate, eventReward, eventSkus  } = row;
  const navigate= useNavigate();

  const [openMenu, setOpenMenu] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  const arrayProductApply = eventSkus?.map(item => item?.systemConfigPoint?.code).join(', ');

  return (
    <MuiTableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>
      <TableCell align="left">{id}</TableCell>
      <TableCell align="left" 
         sx={{
          alignItems: 'center',
          '&:hover': { color: '#D5B4B4', cursor: 'pointer' },
          color: 'red',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          maxWidth: 150,
          textOverflow: 'ellipsis',
          overflow: 'hidden!important',
          whiteSpace: 'nowrap',
        }}
        onClick={() => navigate(PATH_DASHBOARD.event.editEvent(id.toString()))}
      >
       {name}
      </TableCell>
      <TableCell align="left"
         sx={{
          alignItems: 'center',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          maxWidth: 150,
          textOverflow: 'ellipsis',
          overflow: 'hidden!important',
          whiteSpace: 'nowrap',
        }}
      >
        {arrayProductApply}
      </TableCell>

      <TableCell align="left">{fDateTime24h(startDate)}</TableCell>

      <TableCell align="left">{fDateTime24h(endDate)}</TableCell>
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

      <TableCell align="center">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Sửa
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Xóa
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </MuiTableRow>
  );
}
