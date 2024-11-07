import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button, MenuItem, Stack, TableCell, TableRow, Chip } from '@mui/material';
import { id } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import en from 'src/common/locales/en';
import { useDispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { formatDay_DMY } from 'src/request-management/request-common/FormatDate';
import { renderFactoryName } from 'src/request-management/request-common/renderFactoryName';
import { IStatus } from 'src/request-management/request-detail/interface';

import { useState } from 'react';

import { useSelector } from 'react-redux';
import useMessage from 'src/common/hooks/useMessage';
import { IPropsTableRow } from '../interfaces';
import Iconify from '../../common/components/Iconify';
import RuleConfigModal from './modal/EditRuleModal';
import {
  isOpenConfirmModalSelector,
  setIsOpenConfirmModal,
  setListRuleConfig,
  setRuleConfigRowItems,
} from '../rule.slice';

export default function RuleTableRow(row: IPropsTableRow) {
  const { rowCode, listRuleConfig } = row;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const statusModal = useSelector(isOpenConfirmModalSelector);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleOpenModal = () => {
    dispatch(
      setRuleConfigRowItems({
        code: rowCode,
        desc: listRuleConfig![rowCode].desc,
        status: listRuleConfig![rowCode].status,
        values: listRuleConfig![rowCode].values,
      })
    );
    dispatch(setListRuleConfig(listRuleConfig));
    dispatch(setIsOpenConfirmModal(true));
  };

  return (
    <>
      <TableRow hover sx={{ borderBottom: '1px dotted gray' }}>
        <TableCell align="left">{rowCode}</TableCell>
        <TableCell
          align="left"
          sx={{
            fontWeight: 'bold',
            maxWidth: 250,
            textOverflow: 'ellipsis',
            overflow: 'hidden!important',
            whiteSpace: 'nowrap',
          }}
        >
          {listRuleConfig![rowCode].desc}
        </TableCell>
        <TableCell align="center">
          <Chip
            label={listRuleConfig![rowCode].status ? 'ACTIVE' : 'INACTIVE'}
            sx={{
              color: 'white',
              minWidth: '100px',
              fontWeight: 900,
              borderRadius: '5px',
              background: listRuleConfig![rowCode].status
                ? 'linear-gradient(to left top, #C0EEF2, #03C988)'
                : 'linear-gradient(to left bottom, #F55050, #FFACAC)',
            }}
          />
        </TableCell>
        <TableCell align="center">
          <Iconify
            icon={'eva:edit-fill'}
            onClick={handleOpenModal}
            sx={{ cursor: 'pointer', fontSize: '25px' }}
          />
        </TableCell>
      </TableRow>
      <RuleConfigModal
        isOpen={statusModal}
        onClose={() => dispatch(setIsOpenConfirmModal(false))}
        configRuleList={listRuleConfig}
      />
      {/* <ConfirmBlockModal
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
      /> */}
    </>
  );
}
