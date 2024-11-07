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
import { IPropsTableRow } from '../../interface';
import Label from '../../../common/components/Label';
import { IStatus } from '../../constants';
import { fDateTime24h } from '../../../common/utils/formatTime';
import { convertStringToHtml } from '../utils/convertStringToHtml';

export default function NotificationTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: IPropsTableRow) {
  const { id, title, content, senderId, timeSent, type, shortContent, source } = row;
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
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
        </TableCell>
        <TableCell>{id}</TableCell>
        <TableCell
          sx={{
            '&:hover': { color: '#D5B4B4', cursor: 'pointer' },
            color: 'red',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: 300,
          }}
          onClick={onEditRow}
        >
          {title}
        </TableCell>
        <TableCell align="left">{source}</TableCell>
        <TableCell align="center">{type}</TableCell>
        <TableCell align="center">{fDateTime24h(timeSent)}</TableCell>

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
          ></TableMoreMenu>
        </TableCell>
      </TableRow>
    </>
  );
}
