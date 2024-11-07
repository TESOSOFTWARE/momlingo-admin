import {
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
  IconButton,
} from '@mui/material';
import lodash from 'lodash';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useEffect } from 'react';
import { GROUP_USER_TABLE_HEAD } from '../../constants';
import useTable from '../../../../common/hooks/useTable';
import { IParamsGroupUser } from '../../interfaces';
import { useGetListGroupUser } from '../../hooks/useGetListGroupUser';
import GroupUserTableRow from './GroupUserTableRow';
import GroupUserTableSkeleton from './ListUserTableSkeleton';
import { useSelectMultiple } from '../../../../common/hooks/useSelectMultiple';
import Iconify from '../../../../common/components/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import useMessage from 'src/common/hooks/useMessage';
import { useDeleteMultipleGroupUser } from '../../hooks/useDeleteMultiple';
import { useTranslation } from 'react-i18next';
import {
  isOpenModalDeleteSelector,
  selectedRowSelector,
  setIsOpenModalDelete,
  setSelectedRow,
} from '../../groupUser.slices';
import { ConfirmModal } from '../../../../common/components/modal/ConfirmModal';
import { PATH_DASHBOARD } from '../../../../common/routes/paths';
import { useNavigate } from 'react-router-dom';

export default function GroupUserDashboard() {
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { useDeepCompareEffect } = useDeepEffect();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    dense,
    page,
    rowsPerPage,
    setPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const searchParams: IParamsGroupUser = {
    page: page + 1,
    limit: rowsPerPage,
  };

  const { data, isLoading } = useGetListGroupUser(searchParams);
  const listGroupUser = data?.items || [];
  const totalItems = data?.meta?.totalItems || 0;

  const isOpenModal = useSelector(isOpenModalDeleteSelector);
  const selectedIdsRedux = useSelector(selectedRowSelector);
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    setSelectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listGroupUser.map((item) => item.id),
    page + 1
  );

  const { mutate } = useDeleteMultipleGroupUser({
    onSuccess: () => {
      showSuccessSnackbar(t('groupUser.deleteSuccess'));
    },
    onError: () => {
      showErrorSnackbar(t('groupUser.deleteFail'));
    },
  });

  const handleDeleteMultiple = (selectedIds: number[]) => {
    dispatch(setIsOpenModalDelete(true));
    dispatch(setSelectedRow(selectedIds));
  };

  const onDeleteMultiple = () => {
    mutate({ ids: selectedIdsRedux });
    dispatch(setSelectedRow([]));
    resetSelect();
  };
  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.userManagement.editGroupUser(id));
  };

  return (
    <Paper elevation={3} sx={{ paddingTop: 3, boxShadow: 10 }}>
      <ConfirmModal
        isOpen={isOpenModal}
        onClose={() => dispatch(setIsOpenModalDelete(false))}
        onSubmit={onDeleteMultiple}
        type={'delete'}
        text={'Bạn có chắc muốn xóa nhóm người dùng?'}
      />
      <TableContainer sx={{ position: 'relative' }}>
        {!!selectedIds.length && (
          <TableSelectedActions
            dense={dense}
            isSelectAll={isCheckedAll}
            numSelected={selectedIds.length}
            rowCount={listGroupUser.length}
            onSelectAllRows={handleCheckAll}
            actions={
              <Tooltip title="Delete">
                <IconButton
                  color="primary"
                  onClick={() => {
                    handleDeleteMultiple(selectedIds);
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
            headLabel={GROUP_USER_TABLE_HEAD}
            rowCount={listGroupUser.length}
            isSelectAll={isCheckedAll}
            numSelected={selectedIds.length}
            onSelectAllRows={handleCheckAll}
          />
          <TableBody>
            {listGroupUser.map((row) => (
              <GroupUserTableRow
                key={row.id}
                row={row}
                onEditRow={() => handleEditRow(row.id)}
                onDeleteRow={() => handleDeleteMultiple([row.id])}
                selected={selectedIds.includes(row.id)}
                onSelectRow={(e) => {
                  handleSelectItem(row.id, e);
                }}
              />
            ))}
            {isLoading && (
              <GroupUserTableSkeleton isLoading={isLoading} row={rowsPerPage} />
            )}
            <TableNoData isNotFound={!isLoading && !listGroupUser?.length} />
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
          label="Dense"
          sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
      </Box>
    </Paper>
  );
}
