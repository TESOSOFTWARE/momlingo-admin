import {
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';
import lodash from 'lodash';
import { TableHeadCustom, TableNoData } from 'src/common/components/table';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import useTable from '../../../common/hooks/useTable';
// import RefundedOrderFilterBar from './FilterRefundedOrder';
import RefundedTableRow from './RefundedOrderTableRow';
import LoadingTableSkeleton from '../../../common/components/LoadingTableSkeleton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrder } from '../../list-physical/hooks/useGetOrder';
import {  useGetListRefundOrderRequest } from '../hooks/useGetListRefundOrder';
import { IParamsRefundedOrderRequest } from '../interfaces';
import { REFUND_REQUEST_TABLE_HEAD } from '../constants';
import { setParamsRefundRequest } from '../slice';

export default function ListRefundOrderRequestDashBoard() {
  const { useDeepCompareEffect } = useDeepEffect();
  const dispatch = useDispatch();

  const {
    dense,
    page,
    rowsPerPage,
    setPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  // const searchData = useSelector(searchDataRefundedOrderSelector);

  const searchParams: IParamsRefundedOrderRequest = {
    page: page + 1,
    limit: rowsPerPage,
    orderRefundStatus:"REQUEST_REFUND_POINT"
    // orderId: searchData?.orderId === 0 ? undefined : searchData?.orderId,
    // name: searchData?.name === '' ? undefined : searchData?.name,
    // startDate: searchData?.startDate === null ? undefined : searchData?.startDate,
    // endDate: searchData?.endDate === null ? undefined : searchData?.endDate,
    // type: searchData?.type === '' ? undefined : searchData?.type,
  };

  useEffect(() => {
  
      dispatch(setParamsRefundRequest(searchParams));
    
  }, [searchParams]);

  // useDeepCompareEffect(() => {
  //   if (searchData) {
  //     setPage(0);
  //   }
  // }, [searchData]);

  const { data, isLoading } = useGetListRefundOrderRequest(searchParams);
  const listRequest = data?.items || [];
  const totalItems = data?.meta?.totalItems || 0;

  return (
    <Paper elevation={3} sx={{ paddingTop: 3, boxShadow: 10 }}>
      {/* <RefundedOrderFilterBar /> */}
      <TableContainer sx={{ position: 'relative' }}>
        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            headLabel={REFUND_REQUEST_TABLE_HEAD}
            rowCount={listRequest.length}
          />
          <TableBody>
            {listRequest.map((row: any) => (
              <RefundedTableRow key={row.id} row={row} />
            ))}
            {isLoading && (
              <LoadingTableSkeleton
                column={REFUND_REQUEST_TABLE_HEAD.length}
                row={rowsPerPage}
              />
            )}
            <TableNoData isNotFound={!isLoading && !listRequest?.length} />
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
