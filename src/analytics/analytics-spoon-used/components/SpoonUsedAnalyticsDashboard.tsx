import { Paper, Grid, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AnalyticsWebsiteVisits } from '../../../common/components/analytics';
import { useSelector } from 'react-redux';
import { searchDataSelector } from '../statisticSpoonUsed.slice';
import { IParamsStatisticSpoon } from '../interfaces';
import { useTranslation } from 'react-i18next';
import { formatDateNoTime } from '../../../common/constants/common.utils';
import {
  useGetCircleStatisticSpoon,
  useGetLineStatisticSpoon,
} from '../hooks/useGetStatisticSpoon';
import AppCurrentDownload from '../../../common/components/analytics/AppCurrentDownload';
import FilterStatisticSpoonUsed from './FilterStatisticSpoonUsed';
import AppAreaInstalled from '../../../common/components/analytics/AppAreaInstalled';
import { getListCircleChart } from '../utils/getListChart';
import AnalyticsSpoonUsedTable from './analytics-spoon-used-table/AnalyticsSpoonUsedTable';

export default function SpoonUsedAnalyticsDashboard() {
  const theme = useTheme();
  const { t } = useTranslation();

  const searchData = useSelector(searchDataSelector);

  const searchParams: IParamsStatisticSpoon = {
    status: 'USED',
    startDate: searchData?.startDate === null ? undefined : searchData.startDate,
    endDate: searchData?.endDate === null ? undefined : searchData.endDate,
  };

  const { data: dataCircleChart, isLoading: isLoadingCircleChartUsed } =
    useGetCircleStatisticSpoon(searchParams);
  const { data: dataLineChart, isLoading: isLoadingLineChart } =
    useGetLineStatisticSpoon(searchParams);
  const listLineChart = dataLineChart || [];
  const listCircleChart = getListCircleChart(dataCircleChart?.data || {});

  const transformedData = listLineChart.map((item) => {
    const { data } = item;
    const testKeys = Object.keys(data);
    const transformedTest: { [key: string]: any } = testKeys.reduce((obj, key) => {
      if (key !== 'date') {
        obj[key] = parseInt(data[key].toLocaleString());
      }
      return obj;
    }, {} as { [key: string]: number });
    return { data: transformedTest };
  });

  const temp: { [key: string]: number[] } = {};
  transformedData.forEach((item) => {
    const { data } = item;
    Object.entries(data).forEach(([key, value]) => {
      if (!temp[key]) {
        temp[key] = [];
      }
      temp[key].push(value);
    });
  });

  return (
    <>
      <Paper elevation={3} sx={{ paddingTop: 3 }}>
        <Stack direction="column" spacing={3}>
          <Stack direction="row" spacing={3} p={3}>
            <Stack flex={3}>
              <FilterStatisticSpoonUsed />
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
                chartData={listCircleChart.map((item) => {
                  return {
                    label: item[0],
                    value: item[1],
                  };
                })}
              />
            </Stack>
          </Stack>
          <Grid item xs={12} md={6} lg={8} p={2}>
            <AppAreaInstalled
              title="Chi tiết"
              chartLabels={
                listLineChart?.map((item) => {
                  return item?.data?.date;
                }) || []
              }
              chartData={Object.entries(temp).map((item) => {
                return {
                  name: item[0],
                  data: item[1],
                };
              })}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8} p={2}>
            <AnalyticsSpoonUsedTable />
          </Grid>
        </Stack>
      </Paper>
    </>
  );
}
