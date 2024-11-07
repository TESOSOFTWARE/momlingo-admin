import useTable from 'src/common/hooks/useTable';
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  Stack,
  FormControlLabel,
  Switch,
  TablePagination,
} from '@mui/material';
import { TableHeadCustom, TableNoData } from 'src/common/components/table';
import { headsData } from 'src/winning-history/constants';
import HistoryTableRow from './HistoryTableRow';
import HistoryToolbar from './HistoryToolbar';
import TitlePage from '../TitlePage';
import { useGetListHistoryWinning } from 'src/winning-history/hooks/useGetListHistoryWinning';
import { useSelector } from 'src/common/redux/store';
import TableSleleton from './TableSleleton';
import { IParamsListHistory } from '../../interface';
import useDebounce from '../../hooks/useDebounce';

export default function HistoryTable() {
  const { textSearch, filterOption } = useSelector((state) => state.historyWinning);
  const {
    dense,
    rowsPerPage,
    page,
    onChangePage,
    onChangeDense,
    onChangeRowsPerPage,
    setPage,
  } = useTable({
    defaultRowsPerPage: 5,
    defaultDense: false,
  });

  const searchParams: IParamsListHistory = {
    page: page + 1,
    limit: rowsPerPage,
  };

  const debouncedTextSearch = useDebounce<string>(textSearch, 500);

  if (debouncedTextSearch.length > 2) {
    searchParams.searchText = debouncedTextSearch;
    searchParams.searchType = filterOption;
  } else {
    delete searchParams.searchText;
    delete searchParams.searchType;
  }

  const { data, isLoading, isFetching } = useGetListHistoryWinning({
    ...searchParams,
  });
  const totalItems = data?.meta.totalItems || 0;
  const dataHistory = data?.items || [];

  return (
    <>
      <TitlePage dataHistory={dataHistory} />

      <Paper elevation={3}>
        <TableContainer>
          <HistoryToolbar setPage={setPage} />
          <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
            <TableHeadCustom headLabel={headsData} rowCount={dataHistory.length} />
            <TableBody>
              {!isLoading &&
                dataHistory?.map((item, index) => (
                  <HistoryTableRow key={index} data={item} />
                ))}
              {isLoading &&
                Array.from(Array(rowsPerPage)).map((_, index) => {
                  return <TableSleleton key={index} isLoading={isLoading} />;
                })}
              <TableNoData isNotFound={!isLoading && !dataHistory.length} />
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          direction="row"
          sx={{ padding: '0 20px' }}
        >
          <FormControlLabel
            control={<Switch checked={dense} onChange={onChangeDense} />}
            label="Dense padding"
          />
          <TablePagination
            rowsPerPageOptions={[1, 5, 10, 25]}
            component="div"
            count={totalItems}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Stack>
      </Paper>
    </>
  );
}
