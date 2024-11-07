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
import { HEAD_LABELS } from '../constants';
import { useGetListRequestExport } from '../hooks/useGetListRequestExport';
import { IParamsGetList } from '../interfaces';
import RequestExportSkeleton from './components/RequestExportSkeleton';
import { RequestExportTableRow } from './components/RequestExportTableRow';

export const RequestExportListContainer = () => {
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

  const searchParams: IParamsGetList = {
    page: page + 1,
    limit: rowsPerPage,
  };

  const { data, isLoading } = useGetListRequestExport(searchParams);
  const dataRequestExport = data?.items || [];
  const totalItems = data?.meta?.totalItems || 0;

  return (
    <>
      <Page title={t('request_export')}>
        <Container maxWidth={themeStretch ? 'sm' : 'xl'}>
          <HeaderBreadcrumbs
            heading={t('request_export')}
            links={[
              { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
              { name: t('request_export') },
            ]}
          />

          <Paper elevation={3} sx={{ padding: 3 }}>
            <TableContainer>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  headLabel={HEAD_LABELS}
                  rowCount={dataRequestExport.length}
                />
                <TableBody>
                  {dataRequestExport.map((row, index) => (
                    <RequestExportTableRow row={row} key={index} />
                  ))}

                  {isLoading && (
                    <RequestExportSkeleton isLoading={isLoading} row={rowsPerPage} />
                  )}

                  <TableNoData isNotFound={!isLoading && !dataRequestExport?.length} />
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
              <FormControlLabel
                control={<Switch checked={dense} onChange={onChangeDense} />}
                label="Dense"
                sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
              />
            </Box>
          </Paper>
        </Container>
      </Page>
    </>
  );
};
