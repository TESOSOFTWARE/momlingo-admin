import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getStatisticPointCircleChart, getStatisticPointLineChart } from '../services';
import { IParamsStatisticPoint } from '../interfaces';

export function useGetLineStatisticPoint(params: IParamsStatisticPoint) {
  return {
    ...useQuery(
      [QUERY_KEYS.STATISTIC_POINT_LINE, params],
      () => getStatisticPointLineChart(params),
      {
        cacheTime: 0,
      }
    ),
  };
}
