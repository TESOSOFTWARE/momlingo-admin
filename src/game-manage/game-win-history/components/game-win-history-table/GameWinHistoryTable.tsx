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
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import useTable from '../../../../common/hooks/useTable';
import GameWinHistoryFilter from '../GameWinHistoryFilter';
import GameWinHistoryHeader from '../GameWinHistoryHeader';
import { useSelector } from 'react-redux';
import { dataFilter } from '../../slice';
import { IParamsListHistory } from '../../interface';
import { useGetGameWinHistory } from '../../hooks/useGetGameWinHistory';
import { TableHeadCustom, TableNoData } from '../../../../common/components/table';
import TableSkeleton from '../SkeletonTable';
import { HEAD_TABLE_PROPS } from '../../constant';
import GameWinHistoryTableRow from './GameWinHistoryTableRow';

function GameWinHistoryTable() {
  const {
    dense,
    page,
    setPage,
    rowsPerPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { t } = useTranslation();

  const contentFilter = useSelector(dataFilter);

  const dataParams: IParamsListHistory = {
    gameGiftId: contentFilter.gameGiftId ? +contentFilter.gameGiftId : undefined,
    searchText: contentFilter.searchText === '' ? undefined : contentFilter.searchText,
    startDate:
      contentFilter.startDate === null || contentFilter.startDate === ''
        ? undefined
        : contentFilter.startDate,
    endDate:
      contentFilter.endDate === null || contentFilter.endDate === ''
        ? undefined
        : contentFilter.endDate,
    page: page + 1,
    limit: rowsPerPage,
  };

  const {
    data: dataGameWinHistory,
    isError,
    isLoading: isLoadingData,
  } = useGetGameWinHistory(dataParams);

  const listGameWinHistory = dataGameWinHistory?.items || [];

  const totalItem = dataGameWinHistory?.meta.totalItems || 0;

  return (
    <>
      <GameWinHistoryHeader searchParams={dataParams} />
      <Paper elevation={3}>
        <GameWinHistoryFilter onSetPage={setPage} />
        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
          <Table size={dense ? 'small' : 'medium'}>
            <TableHeadCustom
              headLabel={HEAD_TABLE_PROPS}
              rowCount={listGameWinHistory?.length}
            />
            <TableBody>
              {listGameWinHistory.map((row) => (
                <GameWinHistoryTableRow key={row.id} row={row} />
              ))}

              <TableSkeleton isLoading={isLoadingData} row={rowsPerPage} />
              <TableNoData
                isNotFound={!isLoadingData && listGameWinHistory.length === 0}
              />
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
            label={t('common.table.dense')}
            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
          />
        </Box>
      </Paper>
    </>
  );
}

export default GameWinHistoryTable;
