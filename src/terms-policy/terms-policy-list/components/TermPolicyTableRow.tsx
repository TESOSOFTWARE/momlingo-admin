import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import Label from '../../../common/components/Label';
import { fDateTime24h } from '../../../common/utils/formatTime';
import { IPropsTableRow } from '../../common/interface';

export default function TermPolicyTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
}: IPropsTableRow) {
  const { id, type, name, status, lang, createdAt, updatedAt } = row;
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
          {name}
        </TableCell>
        <TableCell align="center">
          <Label color={(status === 'ACTIVE' && 'success') || 'default'}>{status}</Label>
        </TableCell>
        <TableCell align="center">
          <Label color={(lang === 'VN' && 'success') || 'default'}>{lang}</Label>
        </TableCell>
        <TableCell align="center">
          <Label
            color={
              (type === 'TERMS' && 'primary') ||
              (type === 'POLICY' && 'secondary') ||
              'warning'
            }
          >
            {type}
          </Label>
        </TableCell>
        <TableCell align="center">{fDateTime24h(createdAt) }</TableCell>
        <TableCell align="center">{fDateTime24h(updatedAt)}</TableCell>
        <TableCell align="right">
          <TableMoreMenu
            open={openMenu}
            onClose={handleCloseMenu}
            onOpen={handleOpenMenu}
            actions={
              <>
                <MenuItem
                  onClick={() => {
                    onViewRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={'eva:eye-fill'} />
                  View
                </MenuItem>
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
