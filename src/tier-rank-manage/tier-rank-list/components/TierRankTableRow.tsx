import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button, TableCell, MenuItem, TableRow, Checkbox } from '@mui/material';
import { id } from 'date-fns/locale';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import en from 'src/common/locales/en';
import { useDispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { formatDay_DMY } from 'src/request-management/request-common/FormatDate';
import Iconify from '../../../common/components/Iconify';
import { TableMoreMenu } from '../../../common/components/table';

import DoneIcon from '@mui/icons-material/Done';
import { ITierRankForm, IPropsTableRow } from '../../interface';
import Label from '../../../common/components/Label';
import { IStatus } from '../../constants';

export default function TierRankTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: IPropsTableRow) {
  const { name, description, isActive, conditionPoint, maxPoint, code } = row;
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
      <TableRow hover selected={selected}>
        <TableCell align="left">
          <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell align="left">{description}</TableCell>
        <TableCell align="center">
          <Label sx={{ background: isActive ? '#76ff03' : '#ff6e42', color: '#333' }}>
            {isActive ? IStatus.ACTIVE : IStatus.IN_ACTIVE}
          </Label>
        </TableCell>
        <TableCell align="center">{code}</TableCell>
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
                  {t('common.tooltip.delete.title')}
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
              </>
            }
          ></TableMoreMenu>
        </TableCell>
      </TableRow>
    </>
  );
}
