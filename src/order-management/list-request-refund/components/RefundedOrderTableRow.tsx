import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button, MenuItem, Stack, TableCell, TableRow } from '@mui/material';
import { id } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import en from 'src/common/locales/en';
import { useDispatch, useSelector } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { formatDay_DMY } from 'src/request-management/request-common/FormatDate';
import { renderFactoryName } from 'src/request-management/request-common/renderFactoryName';
import { IStatus } from 'src/request-management/request-detail/interface';
import { useState } from 'react';
import { TableMoreMenu } from '../../../common/components/table';
import Iconify from '../../../common/components/Iconify';
import { formatDate, formatDateNoTime } from '../../../common/constants/common.utils';

import useMessage from 'src/common/hooks/useMessage';
import { IPropsTableRow } from '../interfaces';
import { setIsOpenConfirmModal, setReject } from '../slice';
import RefundRequestModal from './RefundRequestModal';

export default function RefundedTableRow({ row }: IPropsTableRow) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    id,
    createdAt,
    orderRefund,
    user
  } = row;
  const {isOpenConfirmModal} = useSelector(state=>state.refundOrderRequest);
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const handleOpenModal = () => {
    dispatch(setIsOpenConfirmModal(true));
  };
  return (
    <>
      <TableRow hover>
        <TableCell align="center">{id}</TableCell>
        <TableCell align="center">{user?.customer?.phoneNumber}</TableCell>
        <TableCell align="center">{user?.customer?.name}</TableCell>
        <TableCell align="center">{formatDate(createdAt)}</TableCell>
        <TableCell align="center">{formatDate(orderRefund?.createdDate)}</TableCell>
        <TableCell align="center">{orderRefund?.reasonRefund ? orderRefund?.reasonRefund :"Chưa có" }</TableCell>
        <TableCell align="center">
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <Stack>
                  <MenuItem
                  sx={{
                   textTransform:"uppercase",
                    color:'green'
                  }}
                    onClick={handleOpenModal}
                  >
                    Chấp nhận
                  </MenuItem>
                  <MenuItem
                
                  sx={{
                   textTransform:"uppercase",
                    color:'red'
                  }}              
                      onClick={()=>{dispatch(setReject(true)); handleOpenModal();}}
                  >
                   Từ chối
                  </MenuItem>
                </Stack>
              </>
            }
          />
        
        </TableCell>
      </TableRow>
      <RefundRequestModal
        isOpen={isOpenConfirmModal}
        onClose={() => dispatch(setIsOpenConfirmModal(false))}
        orderId={id}
      />
    </>
  );
}
