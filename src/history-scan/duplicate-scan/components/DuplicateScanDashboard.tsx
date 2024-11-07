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
import LoadingTableSkeleton from '../../../common/components/LoadingTableSkeleton';

import useTable from '../../../common/hooks/useTable';
import { DUPLICATE_SCAN_TABLE_HEAD } from '../../constants';
import { IDuplicateScan } from '../../interfaces';

import { searchDuplicateSelector } from '../../historyScan.slice';
import { useGetListDuplicateScan } from '../../hooks/useGetListDuplicateScan';
import DuplicateScanFilterBar from './DuplicateScanFilterBar';
import DuplicateScanTableRow from './DuplicateScanTableRow';

type Props = {
  searchUserId?: number;
  smallTable?: boolean;
};

export default function DuplicateScanDashBoard({ searchUserId, smallTable }: Props) {
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

  const searchData = useSelector(searchDuplicateSelector);

  const searchParams = {
    page: page + 1,
    limit: rowsPerPage,
    startDate: searchData?.startDate !== null ? searchData.startDate : undefined,
    endDate: searchData?.endDate !== null ? searchData.endDate : undefined,
    searchText: searchData?.searchText ? searchData.searchText : undefined,
    phoneNumber: searchData?.phoneNumber ? searchData.phoneNumber : undefined,
  };

  const { data, isLoading, isRefetching } = useGetListDuplicateScan(searchParams);

  const listRequest = data?.items || [];

  // const listRequest = DATA_LIST_USER;
  const totalItems = data?.total || 0;
  // const totalItems = 0;

  return (
    <Paper elevation={3} sx={{ paddingTop: 3, boxShadow: 10 }}>
      <DuplicateScanFilterBar onSetPage={setPage} />
      <TableContainer sx={{ position: 'relative' }}>
        <Table size={smallTable ? 'small' : dense ? 'small' : 'medium'}>
          <TableHeadCustom
            headLabel={DUPLICATE_SCAN_TABLE_HEAD}
            rowCount={listRequest.length}
          />
          <TableBody>
            {listRequest.map((row: IDuplicateScan) => (
              <DuplicateScanTableRow key={row.id} row={row} isRefetching={isRefetching} />
            ))}
            {isLoading && (
              <LoadingTableSkeleton
                row={rowsPerPage}
                column={DUPLICATE_SCAN_TABLE_HEAD.length}
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
