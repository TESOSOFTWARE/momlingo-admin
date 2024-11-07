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
import useTable from '../../../../common/hooks/useTable';

import RequestFilter from '../DownloadHistoryFilter';
import RequestTableSkeleton from '../DownloadHistoryTableSkeleton';
import RequestTableRow from './HistoryTableRow';
import { useEffect } from 'react';
import { dispatch } from '../../../../common/redux/store';
import { IListHistoryDownloadParams } from '../../interface';
import { useGetListHistoryDownload } from '../../hooks/useGetListHistoryDownload';
import { dataSearch, setSearchForm } from '../../slice';
import { defaultValueSearch, HEAD_TABLE_PROPS } from '../../constants';

export default function HistoryTableForm() {
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

  const searchContents = useSelector(dataSearch);

  const searchParams: IListHistoryDownloadParams = {
    page: page + 1,
    limit: rowsPerPage,
    fileName: searchContents.fileName,
    startDate: searchContents.startDate,
    endDate: searchContents.endDate,
  };
  useEffect(() => {
    return () => {
      dispatch(setSearchForm(defaultValueSearch));
    };
  }, []);
  useDeepCompareEffect(() => {
    if (searchContents) {
      setPage(0);
    }
  }, [searchContents]);

  const { data, isLoading } = useGetListHistoryDownload(searchParams);

  const listRequest = data?.items || [];
  const totalItems = data?.meta?.totalItems || 0;

  return (
    <Paper elevation={3} sx={{ paddingTop: 3 }}>
      <RequestFilter />
      <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom headLabel={HEAD_TABLE_PROPS} rowCount={listRequest.length} />

          <TableBody>
            {listRequest.map((row) => (
              <RequestTableRow key={row.id} row={row} />
            ))}
            {isLoading && (
              <RequestTableSkeleton isLoading={isLoading} row={rowsPerPage} />
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
          label="Dense"
          sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
      </Box>
    </Paper>
  );
}
