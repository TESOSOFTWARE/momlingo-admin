import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getStatisticCircleChart, getStatisticLineChart } from '../services';
import { IParamsStatisticScan } from '../interfaces';

export function useGetCircleStatistic(params: IParamsStatisticScan) {
  return {
    ...useQuery(
      [QUERY_KEYS.STATISTIC_SCAN_CIRCLE, params],
      () => getStatisticCircleChart(params),
      {
        cacheTime: 0,
      }
    ),
  };
}
