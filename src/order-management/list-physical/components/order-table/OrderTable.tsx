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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../../common/components/Iconify';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from '../../../../common/components/table';
import useMessage from '../../../../common/hooks/useMessage';
import { useSelectMultiple } from '../../../../common/hooks/useSelectMultiple';
import useTable from '../../../../common/hooks/useTable';
import { PATH_DASHBOARD } from '../../../../common/routes/paths';
import { replacePathParams } from '../../../../common/utils/replaceParams';
import { TABLE_HEAD } from '../../constant';
import { useGetOrder } from '../../hooks/useGetOrder';
import { IOrderParams } from '../../interface';
import { dataFilter } from '../../slice';
import OrderTableRow from './OrderTableRow';
import TableSkeleton from './TableSkeleton';
import { EnumType } from '../../../common/interface';
import OrderFilter from '../OrderFilter';

export default function OrderTable() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected: selectedRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const navigate = useNavigate();

  const contentFilter = useSelector(dataFilter);

  const dataParams: IOrderParams = {
    status: contentFilter.status === 'All' ? undefined : contentFilter.status,
    startDate: contentFilter.startDate === '' ? undefined : contentFilter.startDate,
    endDate: contentFilter.endDate === '' ? undefined : contentFilter.endDate,
    phone: contentFilter.phone === '' ? undefined : contentFilter.phone,
    orderId: contentFilter.orderId === 0 ? undefined : contentFilter.orderId,
    page: page + 1,
    limit: rowsPerPage,
    type: EnumType.PHYSICAL,
  };

  const {
    data: dataOrder,
    isError,
    isLoading: isLoadingData,
    isSuccess,
  } = useGetOrder(dataParams);
  const listOrders = dataOrder?.items || [];

  const totalItem = dataOrder?.meta.totalItems || 0;

  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listOrders.map((orders) => {
      return orders.id;
    }),
    page + 1
  );

  const handleEditRow = (id: number) => {
    navigate(replacePathParams(PATH_DASHBOARD.order_management.edit, { id: id }));
  };
  const handleDetailRow = (id: number) => {
    navigate(replacePathParams(PATH_DASHBOARD.order_management.detail, { id: id }));
  };
  const handlePostGHN = (id: number[]) => {
    navigate(replacePathParams(PATH_DASHBOARD.order_management.detail, { id: id }));
  };
  return (
    <>
      <OrderFilter onSetPage={setPage} />

      <Paper elevation={3}>
        <TableContainer sx={{ position: 'relative' }}>
          {!!selectedIds.length && (
            <TableSelectedActions
              dense={dense}
              isSelectAll={isCheckedAll}
              numSelected={selectedIds.length}
              rowCount={listOrders.length || 0}
              onSelectAllRows={handleCheckAll}
              actions={[
                <Tooltip title={'Duyệt'} key="2">
                  <IconButton color="primary" onClick={() => handlePostGHN(selectedIds)}>
                    <Iconify icon={'ion:push-outline'} />
                  </IconButton>
                </Tooltip>,
              ]}
            />
          )}
          <Table size={dense ? 'small' : 'medium'}>
            <TableHeadCustom
              headLabel={TABLE_HEAD}
              order={order}
              orderBy={orderBy}
              rowCount={listOrders.length}
              numSelected={selectedIds.length}
              onSort={onSort}
              isSelectAll={isCheckedAll}
              onSelectAllRows={handleCheckAll}
            />
            <TableBody>
              {listOrders.map((row) => (
                <OrderTableRow
                  key={row.id}
                  row={row}
                  selected={selectedIds.includes(row.id)}
                  onSelectRow={(e) => handleSelectItem(row.id, e)}
                  onEditRow={() => handleEditRow(row.id)}
                  onDetailRow={() => handleDetailRow(row.id)}
                />
              ))}
              <TableSkeleton isLoading={isLoadingData} row={10} />
              <TableNoData isNotFound={isError} />
              {isSuccess && <TableNoData isNotFound={totalItem === 0 ? true : false} />}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={totalItem}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
          <FormControlLabel
            control={<Switch checked={dense} onChange={onChangeDense} />}
            label={'Thu gọn'}
            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
          />
        </Box>
      </Paper>
    </>
  );
}
