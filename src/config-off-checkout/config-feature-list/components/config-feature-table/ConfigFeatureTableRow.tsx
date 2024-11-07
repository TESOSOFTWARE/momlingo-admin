import { MenuItem, Stack, Switch, TableCell, TableRow, Chip } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  IConfigFeatureItem,
  IPropsConfigFeatureListTable,
} from '../../config-feature-interface';
import { useEditConfigFeature } from '../../hooks/useEditConfigFeature';
import useMessage from '../../../../common/hooks/useMessage';
import vn from '../../../../common/locales/vn';
import Iconify from '../../../../common/components/Iconify';
import { useSelector, useDispatch } from 'react-redux';
import {
  isOpenConfirmModalSelector,
  setFeatureConfigRowItems,
  setIsOpenConfirmModal,
} from '../../config-feature-slice';
import ConfirmChangeConfigFeatureModal from './ConfigFeatureModal';

function ConfigFeatureTableRow({
  rowCode,
  configFeatureList,
}: IPropsConfigFeatureListTable) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const statusModal = useSelector(isOpenConfirmModalSelector);

  const handleOpenModal = () => {
    dispatch(
      setFeatureConfigRowItems({
        code: rowCode,
        desc: configFeatureList![rowCode].desc,
        status: configFeatureList![rowCode].status,
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
          {configFeatureList![rowCode].desc}
        </TableCell>
        <TableCell align="center">
          <Chip
            label={configFeatureList![rowCode].status ? 'ACTIVE' : 'INACTIVE'}
            sx={{
              color: 'white',
              minWidth: '100px',
              fontWeight: 900,
              borderRadius: '5px',
              background: configFeatureList![rowCode].status
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
      <ConfirmChangeConfigFeatureModal
        isOpen={statusModal}
        onClose={() => dispatch(setIsOpenConfirmModal(false))}
        nameFeature={configFeatureList![rowCode].desc}
        configFeatureList={configFeatureList}
        rowCode={rowCode}
        status={false}
      />
    </>
  );
}

export { ConfigFeatureTableRow };
