import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getStatisticCircleChart, getStatisticLineChart } from '../services';
import { IParamsStatisticScan } from '../interfaces';

export function useGetLineStatistic(params: IParamsStatisticScan) {
  return {
    ...useQuery(
      [QUERY_KEYS.STATISTIC_SCAN_LINE, params],
      () => getStatisticLineChart(params),
      {
        cacheTime: 0,
      }
    ),
  };
}
