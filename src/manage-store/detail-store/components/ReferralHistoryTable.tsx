import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
  Box,
  FormControlLabel,
  Switch,
  TablePagination,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import LoadingTableSkeleton from '../../../common/components/LoadingTableSkeleton';
import { TableHeadCustom, TableNoData } from '../../../common/components/table';
import useTable from '../../../common/hooks/useTable';
import { DETAIL_HEAD_LABELS, dataHistoryReferralHistory } from '../../constant';
import { useGetExternalRefHistory } from '../../hooks/useGetExternalReferrerById';
import { IExternalHistoryParams } from '../../interfaces';
import { ReferralHistoryTableRow } from './ReferralHistoryTableRow';
import lodash from 'lodash';

export const ReferralHistoryTable = () => {
  const {
    dense,
    page,
    rowsPerPage,
    setPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { id } = useParams();

  const searchParams: IExternalHistoryParams = {
    page: page + 1,
    limit: rowsPerPage,
    externalReferrerId: parseInt(id as string),
  };

  const { data, isLoading } = useGetExternalRefHistory(searchParams);
  const historyExternal = data?.items || [];
  const totalItems = data?.meta?.totalItems || 0;

  return (
    <>
      <Typography variant="h4" sx={{ marginTop: 10, marginBottom: 3 }}>
        Lịch sử giới thiệu
      </Typography>
      <Paper elevation={3} sx={{ pt: 2 }}>
        <TableContainer>
          <Table size={'medium'}>
            <TableHeadCustom
              headLabel={DETAIL_HEAD_LABELS}
              rowCount={dataHistoryReferralHistory?.length}
            />
            <TableBody>
              {historyExternal?.map((item: any, index: number) => (
                <ReferralHistoryTableRow row={item} key={index} />
              ))}
              {isLoading && (
                <LoadingTableSkeleton
                  row={rowsPerPage}
                  column={DETAIL_HEAD_LABELS?.length}
                />
              )}
              <TableNoData isNotFound={!isLoading && !historyExternal?.length} />
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
    </>
  );
};
