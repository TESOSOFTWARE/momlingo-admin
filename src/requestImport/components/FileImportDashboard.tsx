import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableBody,
  Box,
  TablePagination,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Page from '../../common/components/Page';
import { TableHeadCustom, TableNoData } from '../../common/components/table';
import { BREADCUMBS } from '../../common/constants/common.constants';
import useSettings from '../../common/hooks/useSettings';
import useTable from '../../common/hooks/useTable';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { IParams } from '../interfaces';
import { useGetListFileImport } from '../hooks/useGetListFileImport';
import { TABLE_HEAD } from '../constants';
import LoadingTableSkeleton from '../../common/components/LoadingTableSkeleton';
import { ImportFileTableRow } from './FileImportTableRow';

export const ListFileImportDashboard = () => {
  const { t } = useTranslation();
  const { themeStretch } = useSettings();

  const {
    dense,
    page,
    rowsPerPage,
    setPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const searchParams: IParams = {
    page: page + 1,
    limit: rowsPerPage,
  };

  const { data, isLoading } = useGetListFileImport(searchParams);
  const dataImportFile = data?.items || [];
  const totalItems = data?.meta?.totalItems || 0;

  return (
    <>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <TableContainer>
          <Table size={'small'}>
            <TableHeadCustom headLabel={TABLE_HEAD} rowCount={dataImportFile?.length} />
            <TableBody>
              {dataImportFile?.map((row, index) => (
                <ImportFileTableRow row={row} key={index} />
              ))}

              {isLoading && (
                <LoadingTableSkeleton row={rowsPerPage} column={TABLE_HEAD.length} />
              )}

              <TableNoData isNotFound={!isLoading && !dataImportFile?.length} />
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={totalItems}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
          {/* <FormControlLabel
            control={<Switch checked={dense} onChange={onChangeDense} />}
            label="Dense"
            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
          /> */}
        </Box>
      </Paper>
    </>
  );
};
