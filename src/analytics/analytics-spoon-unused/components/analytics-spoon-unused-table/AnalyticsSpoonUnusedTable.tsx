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
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import useTable from '../../../../common/hooks/useTable';
import { useSelector } from 'react-redux';
import { TableHeadCustom, TableNoData } from '../../../../common/components/table';
import TableSkeleton from '../SkeletonTable';
import { HEAD_TABLE_PROPS } from '../../constants';
import { useGetLineStatisticSpoon } from '../../hooks/useGetStatisticSpoon';
import { IParamsStatisticSpoon } from '../../interfaces';
import AnalyticsSpoonUnusedRow from './AnalyticsSpoonUnusedRow';
import { searchDataSelector } from '../../statisticSpoonUnused.slice';

function stableSort<T>(array: T[]) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  return stabilizedThis.map((el) => el[0]);
}

export default function AnalyticsSpoonUnusedTable() {
  const { dense, page, rowsPerPage, onChangeDense, onChangePage, onChangeRowsPerPage } =
    useTable();
  const { t } = useTranslation();

  const searchData = useSelector(searchDataSelector);

  const searchParams: IParamsStatisticSpoon = {
    startDate: searchData?.startDate === null ? undefined : searchData.startDate,
    endDate: searchData?.endDate === null ? undefined : searchData.endDate,
  };

  const { data: dataLineChart, isLoading: isLoadingData } =
    useGetLineStatisticSpoon(searchParams);
  const listSpoonUsed = dataLineChart || [];

  const visibleRows = stableSort(listSpoonUsed).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <Paper elevation={3}>
      <Typography variant="h5" p={3}>
        {' '}
        Danh sách
      </Typography>
      <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            headLabel={HEAD_TABLE_PROPS}
            rowCount={listSpoonUsed?.length}
          />
          <TableBody>
            {visibleRows?.map((row, index) => {
              const ordinalRow = page * rowsPerPage + index + 1;
              return (
                <AnalyticsSpoonUnusedRow key={index} row={row} ordinal={ordinalRow} />
              );
            })}

            <TableSkeleton isLoading={isLoadingData} row={rowsPerPage} />
            <TableNoData isNotFound={!isLoadingData && listSpoonUsed.length === 0} />
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={listSpoonUsed?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
        <FormControlLabel
          control={<Switch checked={dense} onChange={onChangeDense} />}
          label={t('common.table.dense')}
          sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
      </Box>
    </Paper>
  );
}
