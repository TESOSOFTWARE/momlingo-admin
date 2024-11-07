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
import { IParamsStatisticScan } from '../../interfaces';
import AnalyticsScanRow from './AnalyticsScanRow';
import { searchDataSelector } from '../../statisticScan.slice';
import { useGetLineStatistic } from '../../hooks/useGetLineStatistic';

function stableSort<T>(array: T[]) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  return stabilizedThis.map((el) => el[0]);
}

export default function AnalyticsScanTable() {
  const { dense, page, rowsPerPage, onChangeDense, onChangePage, onChangeRowsPerPage } =
    useTable();
  const { t } = useTranslation();

  const searchData = useSelector(searchDataSelector);

  const searchParams: IParamsStatisticScan = {
    provinceKeys: decodeURIComponent(
      searchData?.provinceKeys?.reduce((f: any, s: any) => `${f}&provinceKeys=${s}`)
    ),
    startDate: searchData.startDate,
    endDate: searchData.endDate,
  };

  const { data: dataLineChart, isLoading: isLoadingData } =
    useGetLineStatistic(searchParams);
  const listLineChart = dataLineChart || [];

  const visibleRows = stableSort(listLineChart).slice(
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
            rowCount={listLineChart?.length}
          />
          <TableBody>
            {visibleRows?.map((row, index) => {
              const ordinalRow = page * rowsPerPage + index + 1;
              return <AnalyticsScanRow key={index} row={row} ordinal={ordinalRow} />;
            })}

            <TableSkeleton isLoading={isLoadingData} row={rowsPerPage} />
            <TableNoData isNotFound={!isLoadingData && listLineChart.length === 0} />
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={listLineChart?.length}
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
