import {
  Box,
  Card,
  FormControlLabel,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import useMessage from 'src/common/hooks/useMessage';
import Iconify from '../../../common/components/Iconify';
import { ConfirmModal } from '../../../common/components/modal/ConfirmModal';
import Scrollbar from '../../../common/components/Scrollbar';
import { useSelectMultiple } from '../../../common/hooks/useSelectMultiple';
import useTable from '../../../common/hooks/useTable';
import { dispatch } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import {
  isOpenConfirmModalSelector,
  selectedIdsSelector,
  setIsOpenConfirmModal,
  setSelectedRow,
} from '../../common/category.slice';
import { CATEGORY_TABLE_HEAD } from '../../common/constant';
import { ICategories, IParamsListCategories } from '../../common/interface';
import { useDeleteMultipleNameChild } from '../../hooks/useDeleteMultiNameChild';
import CategoryTableRow from './CategoryTableRow';
import CategoryTableSkeleton from './CategoryTableSkeleton';
import { useGetListNameChild } from '../../hooks/useGetListNameChild';

export default function CategoryDashBoard() {
  const { useDeepCompareEffect } = useDeepEffect();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    setSelected,

    selected: selectedRows,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const searchParams: IParamsListCategories = {
    page: page + 1,
    limit: rowsPerPage,
    lan: '',
    gender: '',
    fullName: '',
  };

  const { data, isLoading } = useGetListNameChild(searchParams) as any;
  console.log(data);
  const listCategory = data?.data || [];
  console.log(listCategory);
  const paginatedData = listCategory.slice(
    page * rowsPerPage, // Vị trí bắt đầu
    (page + 1) * rowsPerPage // Vị trí kết thúc
  );

  const totalItems = listCategory.length;
  // const listCategory = DATA_LIST_USER;
  // const totalItems = data?.meta?.totalItems || 0;
  // const totalItems = 0;
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    setSelectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listCategory.map((item: any) => item.id),
    page + 1
  );

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const isOpenModal = useSelector(isOpenConfirmModalSelector);
  const selectedRowRedux = useSelector(selectedIdsSelector);

  const { mutate } = useDeleteMultipleNameChild({
    onSuccess: () => {
      showSuccessSnackbar(t('nameChild.deleteSuccess'));
    },
    onError: () => {
      showErrorSnackbar(t('nameChild.deleteFail'));
    },
  });

  const handleDeleteMulti = (selectedIds: number[]) => {
    dispatch(setIsOpenConfirmModal(true));
    dispatch(setSelectedRow(selectedIds));
    resetSelect();
  };
  const onDeleteMultiple = () => {
    // console.log(selectedRowRedux[0])
    mutate(selectedRowRedux[0].toString());
    dispatch(setSelectedRow([]));
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.category.edit(id));
  };
  const isNotFound = !isLoading && !listCategory.length;

  return (
    <Card sx={{ padding: 3 }}>
      <ConfirmModal
        isOpen={isOpenModal}
        onClose={() => dispatch(setIsOpenConfirmModal(false))}
        onSubmit={onDeleteMultiple}
        type={'delete'}
        text={'Bạn có chắc muốn xóa các tên đã chọn?'}
      />
      <Scrollbar>
        <TableContainer sx={{ position: 'relative' }}>
          {!!selectedIds.length && (
            <TableSelectedActions
              dense={dense}
              isSelectAll={isCheckedAll}
              numSelected={selectedIds.length}
              rowCount={listCategory.length}
              onSelectAllRows={handleCheckAll}
              actions={
                <Tooltip title="Delete">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleDeleteMulti(selectedIds.map((id) => Number(id)));
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
              headLabel={CATEGORY_TABLE_HEAD}
              rowCount={listCategory.length}
              numSelected={selectedIds.length}
              onSort={onSort}
              onSelectAllRows={handleCheckAll}
            />

            <TableBody>
              {paginatedData.map((row: ICategories) => (
                <CategoryTableRow
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
              <CategoryTableSkeleton isLoading={isLoading} row={rowsPerPage} />
              <TableNoData isNotFound={isNotFound} />
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={totalItems}
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
    </Card>
  );
}
