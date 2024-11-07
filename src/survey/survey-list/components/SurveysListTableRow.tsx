import {
  Box,
  Checkbox,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { fDateTime24h } from 'src/common/utils/formatTime';
import Label from '../../../common/components/Label';
import { SurveyTableProps } from '../../common/survey.interface';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { IStatus } from '../../common/survey.constant';

export default function SurveyTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewUsers,
}: SurveyTableProps) {
  const navigate = useNavigate();
  const { id, name, point, startDate, endDate, status } = row;
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();
  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>
      <TableCell align="left">{id}</TableCell>
      <TableCell
        align="left"
        sx={{
          color: 'red',
          cursor: 'pointer',
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}
        onClick={() => navigate(PATH_DASHBOARD.survey.view_user(id))}
      >
        {name.length > 30 ? name.slice(0, 35) : name}
      </TableCell>
      <TableCell align="center">{point}</TableCell>
      <TableCell align="center">{fDateTime24h(startDate)}</TableCell>
      <TableCell align="center">{fDateTime24h(endDate)}</TableCell>
      <TableCell align="center">
        <Chip
          label={status}
          sx={{
            color: 'white',
            minWidth: '100px',
            fontWeight: 900,
            borderRadius: '5px',
            background:
              status === IStatus.ACTIVE
                ? 'linear-gradient(to left top, #C0EEF2, #03C988)'
                : 'linear-gradient(to left bottom, #F55050, #FFACAC)',
          }}
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
                  onViewUsers();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:eye-fill'} />
                {t('survey.action.view_user.root')}
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
  );
}
