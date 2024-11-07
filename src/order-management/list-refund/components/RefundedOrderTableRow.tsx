import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button, MenuItem, Stack, TableCell, TableRow } from '@mui/material';
import { id } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import en from 'src/common/locales/en';
import { useDispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { formatDay_DMY } from 'src/request-management/request-common/FormatDate';
import { renderFactoryName } from 'src/request-management/request-common/renderFactoryName';
import { IStatus } from 'src/request-management/request-detail/interface';
import { useState } from 'react';
import { TableMoreMenu } from '../../../common/components/table';
import Iconify from '../../../common/components/Iconify';
import { formatDate, formatDateNoTime } from '../../../common/constants/common.utils';

import { useSelector } from 'react-redux';
import useMessage from 'src/common/hooks/useMessage';
import { IPropsTableRow } from '../interfaces';

export default function RefundedTableRow({ row }: IPropsTableRow) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    id,
    phoneNumber,
    createdAtOrder,
    refundPoint,
    refundDate,
    contentRefund,
    name,
    type,
  } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const handleClickDetail = () => {
    navigate(PATH_DASHBOARD.order_management.view_refund(id.toString()));
  };

  return (
    <>
      <TableRow hover>
        <TableCell align="center">{id}</TableCell>
        <TableCell
          align="center"
          onClick={handleClickDetail}
          sx={{
            '&:hover': { color: '#D5B4B4', cursor: 'pointer' },
            color: 'red',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {phoneNumber}
        </TableCell>
        <TableCell align="left" sx={{ fontWeight: name ? 'bold' : null }}>
          {name ? name : 'Không có'}
        </TableCell>
        <TableCell align="center">{formatDate(createdAtOrder)}</TableCell>
        <TableCell align="center">{refundPoint}</TableCell>
        <TableCell align="center">{formatDate(refundDate)}</TableCell>
        <TableCell align="center" sx={{ fontWeight: 'bold' }}>
          {type}
        </TableCell>
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
                      navigate(
                        PATH_DASHBOARD.order_management.view_refund(id.toString())
                      );
                    }}
                  >
                    <Iconify icon={'mdi:eye-outline'} />
                    Xem
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
