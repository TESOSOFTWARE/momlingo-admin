import { Box, Checkbox, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { fDateTime24h } from 'src/common/utils/formatTime';
import Label from '../../../common/components/Label';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { ICategoryTableProps } from '../../common/interface';

export default function CategoryTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: ICategoryTableProps) {
  const navigate = useNavigate();
  // const { id, categoryDetails } = row;
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();
  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  // const categoryDetailsVN = categoryDetails?.find((item) => item.lang === 'VN');

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>
      <TableCell align="left">{row?.id}</TableCell>
      <TableCell
        align="left"
        sx={{
          fontWeight: 'bold',
          color: 'red',
          cursor: 'pointer',
          '&:hover': { color: '#D5B4B4' },
        }}
        onClick={() => navigate(PATH_DASHBOARD.category.edit(row?.id))}
      >
        {row?.name}
      </TableCell>
      <TableCell align="left">{row?.lan}</TableCell>
      <TableCell
        sx={{
          maxWidth: '400px',
        }}
        align="left"
      >
        {row?.meaning}
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
        />
      </TableCell>
    </TableRow>
  );
}
