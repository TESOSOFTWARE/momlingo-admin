import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { IPropsTableRow } from '../../common/interface';

export default function ConfigPlayTimeTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: IPropsTableRow) {
  const { id, game, productGroup, weight, value } = row;
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <>
      <TableRow hover selected={selected} sx={{ cursor: 'pointer' }}>
        <TableCell align="left">
          <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
        </TableCell>
        <TableCell align="center">{id}</TableCell>
        <TableCell align="center" sx={{ minWidth: '140px' }}>
          {game?.id}
        </TableCell>
        <TableCell align="center" sx={{ minWidth: '140px' }}>
          {productGroup}
        </TableCell>
        <TableCell align="center">
          {weight}
        </TableCell>
        <TableCell align="center">
          {value}
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
                  {t('edit')}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onDeleteRow();
                    handleCloseMenu();
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  {t('delete')}
                </MenuItem>
              </>
            }
          />
        </TableCell>
      </TableRow>
    </>
  );
}
