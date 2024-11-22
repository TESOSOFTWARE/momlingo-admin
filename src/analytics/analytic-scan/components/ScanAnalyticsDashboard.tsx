import { Paper, Grid, Typography, Stack, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AnalyticsWebsiteVisits } from '../../../common/components/analytics';
import AppCurrentDownload from '../../../common/components/analytics/AppCurrentDownload';
import { useGetCircleStatistic } from '../hooks/useGetCircleStatistic';
import { useSelector } from 'react-redux';
import { provincePickedSelector, searchDataSelector } from '../statisticScan.slice';
import { IParamsStatisticScan, IProvince } from '../interfaces';
import { useGetLineStatistic } from '../hooks/useGetLineStatistic';
import { useTranslation } from 'react-i18next';
import AppAreaInstalled from '../../../common/components/analytics/AppAreaInstalled';
import FilterStatisticScan from './StatisticScanFilter';
import { formatDateNoTime } from '../../../common/constants/common.utils';
import AnalyticsScanTable from './analytics-scan-table/AnalyticsScanTable';

export default function ScanAnalyticsDashboard() {
  const theme = useTheme();
  const { t } = useTranslation();
  const searchData = useSelector(searchDataSelector);
  const searchParams: IParamsStatisticScan = {
    provinceKeys: decodeURIComponent(
      searchData?.provinceKeys?.reduce((f: any, s: any) => `${f}&provinceKeys=${s}`)
    ),
    startDate: searchData.startDate,
    endDate: searchData.endDate,
  };
  const { data: dataLineChart } = useGetLineStatistic(searchParams);

  const { data: dataCircleChart } = useGetCircleStatistic(searchParams);

  const listLineChart = dataLineChart || [];
  const listCircleChart = dataCircleChart?.data || {};
  const provincePicked = useSelector(provincePickedSelector);

  const changeIdProvinceToName = (id: string) => {
    if (id === 'ALL') return 'Tất cả tỉnh thành';
    if (id === 'UNKNOWN') return 'Chưa chọn tỉnh thành';
    return provincePicked?.find((item: IProvince) => item.id === parseInt(id))
      ?.name as string;
  };

  const circleChart = Object?.keys(listCircleChart)?.map((item) => {
    if (item === 'ALL') {
      return {
        label: changeIdProvinceToName(item),
        value: listCircleChart[item] - listCircleChart['UNKNOWN'],
      };
    }
    return {
      label: changeIdProvinceToName(item),
      value: listCircleChart[item],
    };
  });

  const lineChartLabel = listLineChart?.map((itemArray) => {
    return itemArray?.data?.date;
  });

  const lineChart: {
    name: string;
    data: number[];
  }[] = [];

  const lineChartData = Object.keys(listLineChart[0]?.data || {}).forEach((itemKey) => {
    if (itemKey !== 'date' && itemKey !== 'ALL' && itemKey !== 'UNKNOWN') {
      lineChart.push({
        name: changeIdProvinceToName(itemKey),
        data: listLineChart?.map((dataValue) => {
          return dataValue?.data[itemKey];
        }),
      });
    }
  });

  const checkShowAll = Object.keys(listLineChart[0]?.data || {}).filter(
    (item) => item !== 'date' && item !== 'ALL' && item !== 'UNKNOWN'
  );

  if (checkShowAll.length === 0) {
    lineChart.push({
      name: changeIdProvinceToName('ALL'),
      data: listLineChart?.map((dataValue) => {
        return dataValue?.data['ALL'] - dataValue?.data['UNKNOWN'];
      }),
    });
    lineChart.push({
      name: changeIdProvinceToName('UNKNOWN'),
      data: listLineChart?.map((dataValue) => {
        return dataValue?.data['UNKNOWN'];
      }),
    });
  }

  return (
    <>
      <Paper elevation={3} sx={{ padding: 2, boxShadow: 10 }}>
        <Stack
          spacing={2}
          width={'100%'}
          direction={'row'}
          justifyContent={'space-between'}
        >
          <FilterStatisticScan />
          <Box sx={{ width: '50%' }}>
            <AppCurrentDownload title="Tổng quan" chartData={circleChart} />
          </Box>
        </Stack>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={12} lg={12}>
            {searchData?.startDate !== null && searchData?.endDate !== null ? (
              <Typography variant="h4">
                {'Thống kê từ: ' +
                  formatDateNoTime(searchData?.startDate as string) +
                  ' đến ' +
                  formatDateNoTime(searchData?.endDate as string)}
              </Typography>
            ) : (
              <Typography variant="h4">Thống kê </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AppAreaInstalled
              title="Chi tiết"
              chartLabels={lineChartLabel || []}
              chartData={lineChart}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AnalyticsScanTable />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
