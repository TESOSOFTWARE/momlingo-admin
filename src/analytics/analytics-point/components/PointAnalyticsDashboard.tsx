import { Paper, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AnalyticsWebsiteVisits } from '../../../common/components/analytics';
import AppCurrentDownload from '../../../common/components/analytics/AppCurrentDownload';
import { useGetCircleStatisticPoint } from '../hooks/useGetCircleStatisticPoint';
import { useSelector } from 'react-redux';
import { searchDataSelector, setSearchData } from '../statisticPoint.slice';
import { IParamsStatisticPoint } from '../interfaces';
import { useGetLineStatisticPoint } from '../hooks/useGetLineStatisticPoint';
import { useTranslation } from 'react-i18next';
import AppAreaInstalled from '../../../common/components/analytics/AppAreaInstalled';
import FilterStatisticPoint from './StatisticPointFilter';
import { formatDateNoTime } from '../../../common/constants/common.utils';
import { useEffect } from 'react';
import { dispatch } from '../../../common/redux/store';
import { setSearchParams } from '../../slice';
import { DEFAULT_VALUE_SEARCH_STATISTIC_POINT } from '../constants';
import AnalyticsPointTable from './analytics-point-table/AnalyticsPointTable';

export default function PointAnalyticsDashboard() {
  const theme = useTheme();
  const { t } = useTranslation();

  const searchData = useSelector(searchDataSelector);
  const searchParams: IParamsStatisticPoint = {
    startDate: searchData?.startDate === null ? undefined : searchData.startDate,
    endDate: searchData?.endDate === null ? undefined : searchData.endDate,
  };
  useEffect(() => {
    dispatch(setSearchData(searchParams));
    return () => {
      dispatch(setSearchData(DEFAULT_VALUE_SEARCH_STATISTIC_POINT));
    };
  }, []);
  const { data: dataCircleChart, isLoading: isLoadingCircleChart } =
    useGetCircleStatisticPoint(searchParams);
  const { data: dataLineChart, isLoading: isLoadingLineChart } =
    useGetLineStatisticPoint(searchParams);
  const listLineChart = dataLineChart || [];
  const listCircleChart = dataCircleChart?.total || 0;
  return (
    <>
      <Paper elevation={3} sx={{ padding: 2, boxShadow: 10 }}>
        <FilterStatisticPoint />
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={12} lg={12}>
            {!!searchData?.startDate && !!searchData?.endDate ? (
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
            <Typography variant="h6" color={'red'}>
              {'Tổng số xu tích: ' + listCircleChart + ' xu'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AnalyticsWebsiteVisits
              title={t('analystPoint.chart.title')}
              subheader={'Thống kê số xu qua các mốc thời gian'}
              chartLabels={listLineChart?.map((item) => item?.date)}
              chartData={[
                {
                  name: 'Point',
                  type: 'line',
                  fill: 'solid',
                  data: listLineChart?.map((item) => item?.total),
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AnalyticsPointTable />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
