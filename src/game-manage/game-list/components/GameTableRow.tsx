import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Iconify from '../../../common/components/Iconify';
import { TableMoreMenu } from '../../../common/components/table';

import { fDateTime24h } from '../../../common/utils/formatTime';
import { IPropsTableRow } from '../../interface';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function GameTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: IPropsTableRow) {
  const { name, startDate, endDate, image, gameType, id } = row;
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const handleClickDetail=() => {
    navigate(PATH_DASHBOARD.gameGift.list(id.toString()));
  }
  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell align ="justify">
          <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
        </TableCell>
        <TableCell>
          <img src={image?.url} alt={`thumbnail-${name}`} width="70px" />
        </TableCell>
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
        <TableCell align="left">{fDateTime24h(startDate)}</TableCell>

        <TableCell align="center">{fDateTime24h(endDate)}</TableCell>

        <TableCell align="center">{gameType?.type}</TableCell>

        <TableCell align="center">
          <TableMoreMenu
            open={openMenu}
            onClose={handleCloseMenu}
            onOpen={handleOpenMenu}
            actions={
              <>
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    handleClickDetail();
                  }}
                >
                  <Iconify icon={'mdi:eye-outline'} />
                  Xem giải
                </MenuItem>
                
                <MenuItem
                  onClick={() => {
                    onEditRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={'eva:edit-fill'} />
                  {t('common.tooltip.edit.title')}
                </MenuItem>
              
                <MenuItem
                  onClick={() => {
                    onDeleteRow();
                    handleCloseMenu();
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  {t('common.tooltip.delete.title')}
                </MenuItem>
              </>
            }
          ></TableMoreMenu>
        </TableCell>
      </TableRow>
    </>
  );
}
