import { Paper, Table, TableBody, TableContainer, Stack, Card, Box, TablePagination, FormControlLabel, Switch } from '@mui/material';
import { TableHeadCustom } from '../../../../common/components/table';
import useTable from '../../../../common/hooks/useTable';
import { useGetConfigFeature } from '../../hooks/useGetConfigFeature';
import Scrollbar from '../../../../common/components/Scrollbar';
import { ConfigFeatureTableRow } from './ConfigFeatureTableRow';
import { TABLE_HEAD } from '../../constants';
import { useGetBabyTracker } from '../../hooks/useGetBabyTracker';
import lodash from 'lodash';
import { BabyTrackerTableRow } from './BabyTrackerTableRow';
export default function ConfigFeatureList() {
  const { 
    dense, 
    page,
    order, 
    orderBy,
    rowsPerPage,
    setPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { data: productList } = useGetConfigFeature();
  const { data: trackerList, isLoading} = useGetBabyTracker();
  console.log(trackerList )
   // const listRequest = DATA_LIST_USER;
  const totalItems = Array.isArray(trackerList) ? trackerList.length : 0;
  const paginatedList = Array.isArray(trackerList)
  ? trackerList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  : [];
  console.log(paginatedList)
  return (
    <Card
      sx={{
        padding: 2,
        background: 'linear-gradient(to right bottom, white, #ECF9FF)',
        boxShadow: 10,
      }}
    >
      <Stack spacing={3}>
        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
          <Table size={dense ? 'small' : 'medium'}>
            <TableHeadCustom order={order} orderBy={orderBy} headLabel={TABLE_HEAD} />
            <TableBody>
              {Object.keys(paginatedList || {}).map((obj) => (
                <BabyTrackerTableRow
                  key={obj}
                  rowCode={obj}
                  TrackerList={paginatedList}
                />
              ))}
              {/* <TableNoData isNotFound={!listProductAttribute?.length} /> */}
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
      </Stack>
    </Card>
  );
}
