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
import { dataFilter } from './common/historyGift.slice';
import { IHistoryGiftUserList, IHistoryGiftUserParams } from './common/interfaces';
import { useGetHistoryGift } from './hooks/useGetHistoryGift';
import { TABLE_HEAD } from './common/constants';
import HistoryGiftTableRow from './HistoryGiftTableRow';
import LoadingTableSkeleton from '../../../../common/components/LoadingTableSkeleton';

type Props = {
    searchUserId?: number;
  };

export default function HistoryGiftTable({searchUserId}: Props) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,

    selected: selectedRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const navigate = useNavigate();

  const contentFilter = useSelector(dataFilter);

  const dataParams: IHistoryGiftUserParams = {
    status: contentFilter.status === 'All' ? undefined : contentFilter.status,
    startDate: contentFilter.startDate === null ? undefined : contentFilter.startDate,
    endDate: contentFilter.endDate === null ? undefined : contentFilter.endDate,
    phone: contentFilter.phone === '' ? undefined : contentFilter.phone,
    orderId: contentFilter.orderId === 0 ? undefined : contentFilter.orderId,
    page: page + 1,
    limit: rowsPerPage,
    type: contentFilter.type === '' ? undefined : contentFilter.type,
    userId: searchUserId,
  };

  const {
    data: dataOrder,
    isError,
    isLoading: isLoadingData,
    isSuccess,
  } = useGetHistoryGift(dataParams);
  const listOrders = dataOrder?.items || [];

  const totalItem = dataOrder?.meta?.totalItems || 0;

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
    <Paper elevation={3}>
      <TableContainer sx={{ position: 'relative' }}>
        {!!selectedIds.length && (
          <TableSelectedActions
            dense={true}
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
        <Table size={'small'}>
          <TableHeadCustom
            headLabel={TABLE_HEAD}
            rowCount={listOrders.length}
            numSelected={selectedIds.length}
            onSort={onSort}
            isSelectAll={isCheckedAll}
            onSelectAllRows={handleCheckAll}
          />
          <TableBody>
            {listOrders?.map((row) => (
              <HistoryGiftTableRow
                key={row.id}
                row={row}
                selected={selectedIds.includes(row.id)}
                onSelectRow={(e) => handleSelectItem(row.id, e)}
                onEditRow={() => handleEditRow(row.id)}
                onDetailRow={() => handleDetailRow(row.id)}
              />
            ))}
            {isLoadingData && (
              <LoadingTableSkeleton
                row={listOrders?.length}
                column={TABLE_HEAD?.length}
              />
            )}
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
      </Box>
    </Paper>
  );
}
