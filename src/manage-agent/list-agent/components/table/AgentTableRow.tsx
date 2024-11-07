import { Box, Checkbox, MenuItem, TableCell, TableRow, Avatar } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Iconify from '../../../../common/components/Iconify';
import { TableMoreMenu } from '../../../../common/components/table';
import { RenderStatusChip } from '../../../common/components/RenderStatusChip';
import { renderNull } from '../../../common/utils/renderNull';
import { renderStatus } from '../../../common/utils/renderStatus';
import { IPropTableRow } from '../../interface';

export default function AgentTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: IPropTableRow) {
  const { t } = useTranslation();
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const { name, email, status, avatar } = row;
  const convertName = renderStatus(status);

  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>
      <TableCell align="left" sx={{ width: '100px' }}>
        <Avatar
          sx={{
            height: 50,
            width: 50,
            borderRadius: '7px',
            objectFit: 'cover',
          }}
          alt={email}
          src={`${avatar?.url}`}
        />
      </TableCell>
      <TableCell align="left">{renderNull(name)}</TableCell>
      <TableCell align="center">{email}</TableCell>
      <TableCell align="center">{RenderStatusChip(convertName)}</TableCell>

      <TableCell align="center">
        <TableMoreMenu
          open={openMenu}
          onClose={handleCloseMenu}
          onOpen={handleOpenMenu}
          actions={
            <>
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
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                {t('edit')}
              </MenuItem>
            </>
          }
        ></TableMoreMenu>
      </TableCell>
    </TableRow>
  );
}
