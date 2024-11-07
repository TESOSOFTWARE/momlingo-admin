import { MenuItem, Stack, Switch, TableCell, TableRow, Chip } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IPropsConfigEventListTable } from '../../config-event-interface';
import { useEditConfigEvent } from '../../hooks/useEditConfigEvent';
import useMessage from '../../../../common/hooks/useMessage';
import vn from '../../../../common/locales/vn';
import Iconify from '../../../../common/components/Iconify';
import { useSelector, useDispatch } from 'react-redux';
import {
  isOpenConfirmModalSelector,
  setEventConfigRowItems,
  setIsOpenConfirmModal,
} from '../../config-event-slice';
import ConfirmChangeConfigEventModal from './ConfigEventModal';
import { fDateTime24h } from '../../../../common/utils/formatTime';

function ConfigEventTableRow({ rowCode, configEventList }: IPropsConfigEventListTable) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const statusModal = useSelector(isOpenConfirmModalSelector);

  const handleOpenModal = () => {
    dispatch(
      setEventConfigRowItems({
        code: rowCode,
        desc: configEventList![rowCode].desc,
        status: configEventList![rowCode].status ? true : false,
        startDate: configEventList![rowCode].startDate,
        endDate: configEventList![rowCode].endDate,
      })
    );
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
          {configEventList![rowCode].desc}
        </TableCell>
        <TableCell align="left">
          {fDateTime24h(configEventList![rowCode].startDate)}
        </TableCell>
        <TableCell align="left">
          {fDateTime24h(configEventList![rowCode].endDate)}
        </TableCell>

        <TableCell align="center">
          <Chip
            label={configEventList![rowCode].status ? 'ACTIVE' : 'INACTIVE'}
            sx={{
              color: 'white',
              minWidth: '100px',
              fontWeight: 900,
              borderRadius: '5px',
              background: configEventList![rowCode].status
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
      <ConfirmChangeConfigEventModal
        isOpen={statusModal}
        onClose={() => dispatch(setIsOpenConfirmModal(false))}
        nameEvent={configEventList![rowCode].desc}
        configEventList={configEventList}
        rowCode={rowCode}
        status={false}
      />
    </>
  );
}

export { ConfigEventTableRow };
