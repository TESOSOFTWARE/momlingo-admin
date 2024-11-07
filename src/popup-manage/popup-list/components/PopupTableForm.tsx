import {
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  IconButton,
  Tooltip,
} from '@mui/material';
import lodash from 'lodash';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useEffect } from 'react';
import useTable from '../../../common/hooks/useTable';
import { TABLE_HEAD } from '../../constants';
import { useGetListPopup } from '../hooks/useGetListPopup';
import { IListPopupParams, IPopupList } from '../../interface';
import PopupTableSkeleton from './PopupTableSkeleton';
import PopupTableRow from './PopupTableRow';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { useSelectMultiple } from '../../../common/hooks/useSelectMultiple';
import { dispatch, useSelector } from '../../../common/redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import Iconify from '../../../common/components/Iconify';
import { useTranslation } from 'react-i18next';
import { ConfirmModal } from '../../../common/components/modal/ConfirmModal';
import { closeConfirmModal, setConfirmModal } from '../../slice';
import { useDeleteById } from '../hooks/useDeleteById';

export default function PopupTableForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { confirmModal } = useSelector((state) => state.popup);
  const handleCloseDeleteModal = () => {
    dispatch(closeConfirmModal());
  };
  const { useDeepCompareEffect } = useDeepEffect();
  const {
    dense,
    page,
    rowsPerPage,
    setPage,
    orderBy,
    order,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const searchParams: IListPopupParams = {
    page: page + 1,
    limit: rowsPerPage,
  };
  const { data, isLoading } = useGetListPopup(searchParams);

  const listPopup = data?.popupConfig || [];
  const totalItems = data?.meta?.totalItems || 0;
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    setSelectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listPopup.map((item) => item.id),
    page + 1
  );
  const { mutate: deletePopupById } = useDeleteById({
    page: page + 1,
    limit: rowsPerPage,
  });
  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.popupManage.edit(id.toString()));
  };
  const handleDeleteSingle = (popup: IPopupList) => {
    dispatch(
      setConfirmModal({
        isOpen: true,
        text: t('survey.action.delete.root'),
        callback: () => {
          setSelectedIds(selectedIds.filter((index) => index !== popup.id));
          deletePopupById(popup.id);
        },
      })
    );
  };
  return (
    <Paper elevation={3} sx={{ paddingTop: 3 }}>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={handleCloseDeleteModal}
        onSubmit={confirmModal.callback}
        type={'delete'}
        text={confirmModal.text}
      />
      <TableContainer sx={{ position: 'relative' }}>
        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
            rowCount={listPopup.length}
            onSort={onSort}
          />
          <TableBody>
            {listPopup.map((row) => (
              <PopupTableRow
                key={row.id}
                row={row}
                selected={selectedIds.includes(row.id)}
                onSelectRow={(e) => {
                  handleSelectItem(row.id, e);
                }}
                onDeleteRow={() => handleDeleteSingle(row)}
                onEditRow={() => {
                  handleEditRow(row.id);
                }}
              />
            ))}
            {isLoading && <PopupTableSkeleton isLoading={isLoading} row={rowsPerPage} />}

            <TableNoData isNotFound={!isLoading && !listPopup?.length} />
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ position: 'relative' }}>
        <FormControlLabel
          control={<Switch checked={dense} onChange={onChangeDense} />}
          label="Dense"
          sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
      </Box>
    </Paper>
  );
}
