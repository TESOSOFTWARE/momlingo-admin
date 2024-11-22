import {
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Typography,
  TableBody,
  TablePagination,
  TextField,
  Stack,
  Grid,
  useTheme,
  TableContainer,
  Table,
  Card,
} from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TableHeadCustom, TableNoData } from 'src/common/components/table';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useSelectMultiple } from '../../../common/hooks/useSelectMultiple';
import useTable from '../../../common/hooks/useTable';
import { dispatch, useSelector } from '../../../common/redux/store';

import lodash from 'lodash';
import { useGetListFeedback } from '../../../feedback/feedback-list/hooks/useGetListFeedback';
import { useGetOrderChart } from '../hooks/useGetOrderChart';
import { useGetOrderChartPie } from '../hooks/useGetOrderChartPie';
import { FormProvider } from '../../../common/components/hook-form';
import { Controller, useForm } from 'react-hook-form';
import { DateTimePicker } from '@mui/x-date-pickers';
import vn from '../../../common/locales/vn';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../common/components/Iconify';
import { LabelStyle } from '../../../config-home/components/banners-section/BannerConfig';
import { setSearchParams, setSearchParamsGame } from '../../slice';
import { IOrdersChart, ISearchForm, stableSort } from '../../interface';
import AppAreaInstalled from '../../../common/components/analytics/AppAreaInstalled';
import AppCurrentDownload from '../../../common/components/analytics/AppCurrentDownload';
import OrderFilter from './OrderFilter';
import { DEFAULT_VALUE_SEARCH_STATISTIC_POINT } from '../../analytics-point/constants';
import { TABLE_HEAD_ORDER } from '../../constants';
import OrderTableRow from './OrderTableRow';

export default function OrderChart() {
  const navigate = useNavigate();
  const theme = useTheme();

  const { t } = useTranslation();
  const { searchParams } = useSelector((state) => state.chart);
  useEffect(() => {
    return () => {
      dispatch(setSearchParams(DEFAULT_VALUE_SEARCH_STATISTIC_POINT));
    };
  }, []);
  const { data: detail, isLoading } = useGetOrderChart(searchParams);
  const { data: overview } = useGetOrderChartPie(searchParams);

  const {
    dense,
    page,
    rowsPerPage,
    setPage,
    orderBy,
    order,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const dataList = stableSort(detail || []).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <Paper elevation={3} sx={{ paddingTop: 3 }}>
      <Stack direction="column" spacing={3}>
        <Stack direction="row" spacing={3} p={3}>
          <Stack flex={3}>
            <OrderFilter />
          </Stack>

          <Stack sx={{ width: '60% !important' }}>
            <AppCurrentDownload
              title="Tổng quan"
              chartColors={[
                theme.palette.primary.lighter,
                theme.palette.primary.light,
                theme.palette.primary.main,
                theme.palette.primary.dark,
              ]}
              chartData={[
                { label: 'Tổng đơn quà vật lý ', value: overview?.totalPhysical || 0 },
                { label: 'Tổng e-voucher ', value: overview?.totalVoucher || 0 },
              ]}
            />
          </Stack>
        </Stack>
        <Grid item xs={12} md={6} lg={8} p={2}>
          <AppAreaInstalled
            title="Chi tiết"
            chartLabels={
              detail?.map((item) => {
                return item?.date;
              }) || []
            }
            chartData={[
              {
                name: 'total',
                data:
                  detail?.map((item) => {
                    return item?.total;
                  }) || [],
              },
              {
                name: 'Tổng đơn quà vật lý ',
                data:
                  detail?.map((item) => {
                    return item?.totalPhysical;
                  }) || [],
              },
              {
                name: 'Tổng e-voucher',
                data:
                  detail?.map((item) => {
                    return item?.totalVoucher;
                  }) || [],
              },
            ]}
          />
        </Grid>
        <Stack
          direction="column"
          sx={{
            margin: '20px !important',
          }}
        >
          <Card
            sx={{
              boxShadow: 3,
            }}
          >
            <Typography variant="h5" p={3}>
              {' '}
              Danh sách
            </Typography>
            <TableContainer sx={{ position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD_ORDER}
                  rowCount={dataList?.length}
                  onSort={onSort}
                />
                <TableBody>
                  {dataList.map((row, index) => (
                    <OrderTableRow
                      key={index + 1}
                      row={row}
                      index={index + page * rowsPerPage}
                    />
                  ))}

                  <TableNoData isNotFound={!isLoading && !dataList?.length} />
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ position: 'relative' }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={lodash.isEmpty(detail?.length) ? (detail?.length as number) : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
              />
            </Box>
          </Card>
        </Stack>
      </Stack>
    </Paper>
  );
}
