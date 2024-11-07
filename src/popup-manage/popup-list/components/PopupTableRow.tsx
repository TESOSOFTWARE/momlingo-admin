import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button, TableCell, MenuItem, TableRow, Checkbox, Link } from '@mui/material';
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
import { IPopupForm, IPropsTableRow } from '../../interface';
import Label from '../../../common/components/Label';
import { IStatus } from '../../constants';
import { fDateTime24h } from '../../../common/utils/formatTime';
import { isValidURL } from '../../../common/constants/common.utils';

export default function PopupTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: IPropsTableRow) {
  const { image, title, link, status, startDate, endDate, ordinal } = row;
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
        <TableCell>
          <img src={image} alt={`thumbnail-${title}`} width="70px" />
        </TableCell>
        <TableCell align="left">{title}</TableCell>
        <TableCell align="left">
          {isValidURL(link) ? <Link href={link}>{link}</Link> : link}
        </TableCell>
        <TableCell align="left">{ordinal}</TableCell>
        <TableCell align="left">{fDateTime24h(startDate)}</TableCell>
        <TableCell align="left">{fDateTime24h(endDate)}</TableCell>
        <TableCell align="center">
          <Label sx={{ background: status ? '#76ff03' : '#ff6e42', color: '#333' }}>
            {status ? IStatus.ACTIVE : IStatus.IN_ACTIVE}
          </Label>
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
