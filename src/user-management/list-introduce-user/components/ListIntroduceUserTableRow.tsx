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
import { IPropsTableRow, IPropsTableRowIntroduceUser } from '../../interfaces';
import { useState } from 'react';
import { TableMoreMenu } from '../../../common/components/table';
import Iconify from '../../../common/components/Iconify';
import { formatDate, formatDateNoTime } from '../../../common/constants/common.utils';
import { StatusAccountProps, UserStatus } from '../../constants';
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
import { fDateTime24h } from '../../../common/utils/formatTime';

export default function IntroduceUserTableRow({ row }: IPropsTableRowIntroduceUser) {
  const { beReferred,referrer,createdAt } =
    row;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const isOpenModalAddPoint = useSelector(isOpenModalAddPointSelector);
  const isOpenModalAccount = useSelector(isOpenModalAccountSelector);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };


  return (
    <>
      <TableRow hover>
        <TableCell
          align="left"
        >
          {referrer?.customer?.name} {referrer?.customer?.email && (<span>({referrer?.customer?.email})</span>)}
        </TableCell>
        <TableCell align="left">{referrer?.customer?.phoneNumber}</TableCell>
        <TableCell align="left">{beReferred?.customer?.name} {beReferred?.customer?.email && (<span>({beReferred?.customer?.email})</span>)}</TableCell>
        <TableCell align="center" sx={{ textTransform: 'uppercase' }}>
          {beReferred?.customer?.phoneNumber}
        </TableCell>
        <TableCell align="left">{fDateTime24h(createdAt)}</TableCell>
        <TableCell align="left">{referrer?.customer?.tierPoint}</TableCell>

      </TableRow>
    </>
  );
}
