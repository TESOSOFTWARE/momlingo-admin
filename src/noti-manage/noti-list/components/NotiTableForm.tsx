import {
  Box,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
} from '@mui/material';
import lodash from 'lodash';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import useTable from '../../../common/hooks/useTable';
import { TABLE_HEAD } from '../../constants';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../common/components/Iconify';
import LoadingTableSkeleton from '../../../common/components/LoadingTableSkeleton';
import { ConfirmModal } from '../../../common/components/modal/ConfirmModal';
import useMessage from '../../../common/hooks/useMessage';
import { useSelectMultiple } from '../../../common/hooks/useSelectMultiple';
import { useSelector } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { INotifications, IParams } from '../../interface';
import {
  setIsOpenModal,
  setIsOpenModalSelector,
  setSelectedRowId,
  setSelectedRowIdSelector
} from '../../slice';
import { useDeleteNotiById } from '../hooks/useDeleteById';
import { useGetListNotifications } from '../hooks/useGetLisNotifications';
import TierRankTableRow from './NotiTableRow';

export default function NotificationsTableForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

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

  const searchParams: IParams = {
    page: page + 1,
    limit: rowsPerPage,
  };
  const { data, isLoading } = useGetListNotifications(searchParams);
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const listTierRank: INotifications[] = data?.items || [];
  const totalItems = data?.meta?.totalItems || 0;

  const isOpenModalDelete = useSelector(setIsOpenModalSelector);
  const selectRowIdRedux = useSelector(setSelectedRowIdSelector);

  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    setSelectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listTierRank.map((item) => item.id),
    page + 1
  );
  const { mutate: deleteNotification } = useDeleteNotiById({
    onSuccess: () => {
      showSuccessSnackbar(t('notificationManage.delete.success'));
    },
    onError: () => {
      showErrorSnackbar(t('notificationManage.delete.error'));
    },
  });

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.notificationManage.edit(id.toString()));
  };
  const handleDeleteMulti = (ids: number[]) => {
    dispatch(setIsOpenModal(true));
    dispatch(setSelectedRowId(ids));
  };

  const onDeleteRows = () => {
    deleteNotification({ ids: selectRowIdRedux });
    resetSelect();
  };

  return (
    <Paper elevation={3} sx={{ paddingTop: 3 }}>
      <ConfirmModal
        isOpen={isOpenModalDelete}
        onClose={() => dispatch(setIsOpenModal(false))}
        onSubmit={onDeleteRows}
        type={'delete'}
        text={'Bạn có chắc muốn xóa các thông báo này không ?'}
      />
      <TableContainer sx={{ position: 'relative' }}>
        {!!selectedIds.length && (
          <TableSelectedActions
            dense={dense}
            isSelectAll={isCheckedAll}
            numSelected={selectedIds.length}
            rowCount={listTierRank.length}
            onSelectAllRows={handleCheckAll}
            actions={
              <Tooltip title="Delete">
                <IconButton
                  color="primary"
                  onClick={() => {
                    handleDeleteMulti(selectedIds);
                  }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                </IconButton>
              </Tooltip>
            }
          />
        )}
        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            isSelectAll={isCheckedAll}
            headLabel={TABLE_HEAD}
            rowCount={listTierRank.length}
            numSelected={selectedIds.length}
            onSort={onSort}
            onSelectAllRows={handleCheckAll}
          />
          <TableBody>
            {listTierRank.map((row) => (
              <TierRankTableRow
                key={row.id}
                row={row}
                selected={selectedIds.includes(row.id)}
                onSelectRow={(e) => {
                  handleSelectItem(row.id, e);
                }}
                onDeleteRow={() => handleDeleteMulti([row.id])}
                onEditRow={() => {
                  handleEditRow(row.id);
                }}
              />
            ))}
            {isLoading && (
              <LoadingTableSkeleton row={rowsPerPage} column={TABLE_HEAD.length} />
            )}

            <TableNoData isNotFound={!isLoading && !listTierRank?.length} />
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={lodash.isEmpty(totalItems) ? (totalItems as number) : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
        <FormControlLabel
          control={<Switch checked={dense} onChange={onChangeDense} />}
          label="Thu gọn"
          sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
      </Box>
    </Paper>
  );
}
