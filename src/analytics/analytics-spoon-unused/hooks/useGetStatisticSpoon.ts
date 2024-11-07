import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsStatisticSpoon } from '../interfaces';
import { getStatisticCircleChart, getStatisticLineChart } from '../services';

export function useGetCircleStatisticSpoon(params: IParamsStatisticSpoon) {
  return {
    ...useQuery(
      [QUERY_KEYS.STATISTIC_SPOON_CIRCLE, params],
      () => getStatisticCircleChart(params),
      {
        cacheTime: 0,
      }
    ),
  };
}

export function useGetLineStatisticSpoon(params: IParamsStatisticSpoon) {
  return {
    ...useQuery(
      [QUERY_KEYS.STATISTIC_SPOON_LINE, params],
      () => getStatisticLineChart(params),
      {
        cacheTime: 0,
      }
    ),
  };
}
