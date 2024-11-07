import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button, MenuItem, Stack, TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { IPropsTableRow } from '../../interfaces';
import { useState } from 'react';
import { TableMoreMenu } from '../../../common/components/table';
import Iconify from '../../../common/components/Iconify';
import { formatDate, formatDateNoTime } from '../../../common/constants/common.utils';
import {
  isOpenModalAccountSelector,
  isOpenModalAddPointSelector,
  rowItemSelector,
  setIsOpenModalAccount,
  setIsOpenModalAddPoint,
  setRowItem,
} from '../../userManage.slice';
import { ConfirmBlockModal } from './modal/ModalConfirmBlock';
import { useSelector } from 'react-redux';
import useMessage from 'src/common/hooks/useMessage';
import useChangeUserStatusAddPoint from '../../hooks/useChangeStatusAddPoint';
import useChangeUserStatusAccount from '../../hooks/useChangeStatusAccount';

export default function UserTableRow({ row }: IPropsTableRow) {
  const {
    name,
    phoneNumber,
    tierCode,
    email,
    id,
    role,
    status,
    lastScanDate,
    lastVisitDate,
    blockAccount,
    address,
    birthDate,
    userPoint,
    blockAddPoint,
    lackRankPoint,
  } = row;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const isOpenModalAddPoint = useSelector(isOpenModalAddPointSelector);
  const isOpenModalAccount = useSelector(isOpenModalAccountSelector);
  const rowItem = useSelector(rowItemSelector);

  const { mutate: mutateAddPoint } = useChangeUserStatusAddPoint({
    onSuccess: () => {
      showSuccessSnackbar(
        `${!rowItem.blockAddPoint ? 'Bỏ chặn' : 'Chặn'} tích xu thành công !`
      );
    },
    onError: () => {
      showErrorSnackbar(
        `${!rowItem.blockAddPoint ? 'Bỏ chặn' : 'Chặn'} tích xu không thành công !`
      );
    },
  });

  const { mutate: mutateAccount } = useChangeUserStatusAccount({
    onSuccess: () => {
      showSuccessSnackbar(`Thay đổi trạng thái tài khoản thành công !`);
    },
    onError: () => {
      showErrorSnackbar(`Thay đổi trạng thái tài khoản thất bại !`);
    },
  });

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleClickDetail = () => {
    navigate(PATH_DASHBOARD.userManagement.view(id));
  };
  const handleClickChangeStatusAddPoint = () => {
    dispatch(
      setRowItem({
        id: id,
        blockAddPoint: !blockAddPoint,
        phoneNumber: phoneNumber,
      })
    );
    dispatch(setIsOpenModalAddPoint(true));
  };

  const handleClickChangeStatusAccount = () => {
    dispatch(
      setRowItem({
        id: id,
        // blockAccount: !blockAccount,
        phoneNumber: phoneNumber,
        blockAccount: blockAccount,
      })
    );
    dispatch(setIsOpenModalAccount(true));
  };

  const handleBlockAddPointAccount = () => {
    const dataPATCH = {
      id: rowItem.id,
      blockAddPoint: rowItem.blockAddPoint,
    };
    mutateAddPoint(dataPATCH);
  };

  const handleBlockStatusAccount = () => {
    const dataPATCH = {
      id: rowItem.id,
      blockAccount: !rowItem.blockAccount,
    };
    mutateAccount(dataPATCH);
  };

  return (
    <>
      <TableRow hover>
        <TableCell
          align="left"
          onClick={handleClickDetail}
          sx={{
            '&:hover': { color: '#D5B4B4', cursor: 'pointer' },
            color: 'red',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {!name ? 'Không có' : name}
        </TableCell>
        <TableCell align="left">{phoneNumber}</TableCell>
        <TableCell align="left">{email}</TableCell>
        <TableCell align="center">{role}</TableCell>

        {/* <TableCell align="center" sx={{ textTransform: 'uppercase' }}>
          {tierCode}
        </TableCell> */}
        {/* <TableCell align="left">{userPoint?.totalPoints}</TableCell> */}
        <TableCell align="left">{formatDateNoTime(birthDate)}</TableCell>
        <TableCell align="center">{formatDate(lastVisitDate)}</TableCell>
        {/* <TableCell align="left">{formatDate(lastScanDate)}</TableCell> */}
        <TableCell
          align="center"
          sx={{
            color: blockAccount ? 'red' : ' green',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          {blockAccount ? 'Khóa' : ' Hoạt động'}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            color: blockAddPoint ? 'red' : 'green',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          {blockAddPoint ? 'Chặn' : 'Không chặn'}
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
                      navigate(PATH_DASHBOARD.userManagement.view(id));
                    }}
                  >
                    <Iconify icon={'mdi:eye-outline'} />
                    Xem
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClickChangeStatusAddPoint();
                      handleCloseMenu();
                    }}
                    sx={{ color: !blockAddPoint ? 'error.main' : 'green' }}
                  >
                    {!blockAddPoint ? (
                      <>
                        <Iconify icon={'ic:outline-block'} />
                        Chặn tích xu
                      </>
                    ) : (
                      <>
                        <Iconify icon={'material-symbols:add-card-outline-rounded'} />
                        Bỏ chặn tích xu
                      </>
                    )}
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleClickChangeStatusAccount();
                      handleCloseMenu();
                    }}
                    sx={{ color: !blockAccount ? 'error.main' : 'green' }}
                  >
                    {!blockAccount ? (
                      <>
                        <Iconify icon={'material-symbols:lock'} />
                        Khóa tài khoản
                      </>
                    ) : (
                      <>
                        <Iconify icon={'material-symbols:lock-open-outline'} />
                        Mở khóa
                      </>
                    )}
                  </MenuItem>
                </Stack>
              </>
            }
          />
        </TableCell>
      </TableRow>
      <ConfirmBlockModal
        isOpen={isOpenModalAddPoint}
        onClose={() => dispatch(setIsOpenModalAddPoint(false))}
        onSubmit={handleBlockAddPointAccount}
        text={`Bạn có chắc muốn ${
          !rowItem.blockAddPoint ? 'bỏ chặn' : 'chặn'
        }  tích xu số điện thoại ${rowItem.phoneNumber} ?`}
      />
      <ConfirmBlockModal
        isOpen={isOpenModalAccount}
        onClose={() => dispatch(setIsOpenModalAccount(false))}
        onSubmit={handleBlockStatusAccount}
        text={`Bạn có chắc muốn ${
          !rowItem.blockAccount ? 'khóa' : 'kích hoạt'
        }  tài khoản có số điện thoại ${rowItem.phoneNumber} ?`}
      />
    </>
  );
}
