import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ISearchForm } from '../../interface';
import { getGameChart } from '../../service';

export function useGetGameChart(params:ISearchForm) {
  return {
    ...useQuery([QUERY_KEYS.GAME_LINE_CHART,params], () => getGameChart(params), {
      cacheTime: 0,
    }),
  };
}
