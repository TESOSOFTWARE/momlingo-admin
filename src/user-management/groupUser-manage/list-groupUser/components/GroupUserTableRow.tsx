import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button, MenuItem, Stack, TableCell, TableRow, Checkbox } from '@mui/material';
import { id } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import en from 'src/common/locales/en';
import { useDispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { formatDay_DMY } from 'src/request-management/request-common/FormatDate';
import { renderFactoryName } from 'src/request-management/request-common/renderFactoryName';
import { IStatus } from 'src/request-management/request-detail/interface';
import { useState } from 'react';

// import { ConfirmBlockModal } from './modal/ModalConfirmBlock';
import { useSelector } from 'react-redux';
import useMessage from 'src/common/hooks/useMessage';

import { IGroupUserTableRow } from '../../interfaces';
import Iconify from '../../../../common/components/Iconify';
import { TableMoreMenu } from '../../../../common/components/table';
import { useTranslation } from 'react-i18next';

export default function GroupUserTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: IGroupUserTableRow) {
  const { id, ownerId, name, userGroupToUsers, status, description } = row;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <>
      <TableRow hover>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
        </TableCell>
        <TableCell align="left">{id}</TableCell>
        <TableCell
          align="left"
          onClick={onEditRow}
          sx={{
            '&:hover': { color: 'error.darker', cursor: 'pointer' },
            color: 'red',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {name}
        </TableCell>
        <TableCell align="left">{description}</TableCell>
        <TableCell align="left">{status}</TableCell>
        <TableCell align="center">
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <Stack>
                  <MenuItem
                    onClick={() => {
                      onEditRow();
                      //   navigate(PATH_DASHBOARD.userManagement.)
                      handleCloseMenu();
                    }}
                  >
                    <Iconify icon={'eva:edit-fill'} />
                    {t('edit')}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      onDeleteRow();
                      //   navigate(PATH_DASHBOARD.userManagement.)
                      handleCloseMenu();
                    }}
                    sx={{ color: 'error.main' }}
                  >
                    <Iconify icon={'eva:trash-2-outline'} />
                    {t('delete')}
                  </MenuItem>
                </Stack>
              </>
            }
          />
        </TableCell>
      </TableRow>
    </>
  );
}
