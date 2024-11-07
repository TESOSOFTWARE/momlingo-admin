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
import { useSelector } from 'react-redux';
import { TableHeadCustom, TableNoData } from 'src/common/components/table';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import LoadingTableSkeleton from '../../common/components/LoadingTableSkeleton';
import HistoryScanTableRow from './HistoryScanTableRow';
import { HISTORY_SCAN_TABLE_HEAD, mockResListHistoryScan } from '../constants';
import { useGetListHistoryScan } from '../hooks/useGetListHistoryScan';
import { IHistoryScan, IListHistoryScanParams } from '../interfaces';
import useTable from '../../common/hooks/useTable';
import HistoryScanFilterBar from './HistoryScanFilterBar';
import { searchFormSelector } from '../historyScan.slice';

type Props = {
  searchUserId?: number;
  smallTable?: boolean;
};

export default function HistoryScanDashBoard({ searchUserId, smallTable }: Props) {
  const { useDeepCompareEffect } = useDeepEffect();
  const {
    dense,
    page,
    rowsPerPage,
    setPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const searchData = useSelector(searchFormSelector);

  const searchParams: IListHistoryScanParams = {
    page: page + 1,
    limit: rowsPerPage,
    startDate: searchData?.startDate !== null ? searchData.startDate : undefined,
    endDate: searchData?.endDate !== null ? searchData.endDate : undefined,
    productGroup: searchData?.productGroup ? searchData.productGroup : undefined,
    status: searchData?.status ? searchData.status : undefined,
    code: searchData?.code ? searchData.code : undefined,
    userId: searchUserId,
  };
  const { data, isLoading } = useGetListHistoryScan(searchParams);

  const listRequest = data?.items || [];

  // const listRequest = DATA_LIST_USER;
  const totalItems = data?.meta?.totalItems || 0;
  // const totalItems = 0;

  return (
    <Paper elevation={3} sx={{ paddingTop: 3, boxShadow: 10 }}>
      <HistoryScanFilterBar searchUserId={searchUserId} onSetPage={setPage} />
      <TableContainer sx={{ position: 'relative' }}>
        <Table size={smallTable ? 'small' : dense ? 'small' : 'medium'}>
          <TableHeadCustom
            headLabel={HISTORY_SCAN_TABLE_HEAD}
            rowCount={listRequest.length}
          />
          <TableBody>
            {listRequest.map((row: IHistoryScan) => (
              <HistoryScanTableRow key={row.id} row={row} />
            ))}
            {isLoading && (
              <LoadingTableSkeleton
                row={rowsPerPage}
                column={HISTORY_SCAN_TABLE_HEAD.length}
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
        {smallTable ? null : (
          <FormControlLabel
            control={<Switch checked={dense} onChange={onChangeDense} />}
            label="Dense"
            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
          />
        )}
      </Box>
    </Paper>
  );
}
