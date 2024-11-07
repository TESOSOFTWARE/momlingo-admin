import { Paper, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { AnalyticsConversionRates, AnalyticsCurrentSubject, AnalyticsWebsiteVisits } from '../../../../common/components/analytics';
import AppCurrentDownload from '../../../../common/components/analytics/AppCurrentDownload';
import AppAreaInstalled from '../../../../common/components/analytics/AppAreaInstalled';

export default function AppAnalyticsDashboard() {
  const theme = useTheme();
  return (
    <>
      <Paper elevation={3} sx={{ padding: 2, boxShadow: 10 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <AnalyticsWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload
              title="Current Download"
              chartColors={[
                theme.palette.primary.lighter,
                theme.palette.primary.light,
                theme.palette.primary.main,
                theme.palette.primary.dark,
              ]}
              chartData={[
                { label: 'Mac', value: 12244 },
                { label: 'Window', value: 53345 },
                { label: 'iOS', value: 44313 },
                { label: 'Android', value: 78343 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled
              title="Area Installed"
              subheader="(+43%) than last year"
              chartLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']}
              chartData={[
                // {
                //   year: '2019',
                //   data: [
                //     { name: 'Asia', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
                //     { name: 'America', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                //   ],
                // },
                // {
                //   year: '2020',
                //   data: [
                //     { name: 'Asia', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                //     { name: 'America', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                //   ],
                // },
              ]}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
