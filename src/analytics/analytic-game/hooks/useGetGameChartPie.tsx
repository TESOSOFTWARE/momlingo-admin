import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import {  ISearchForm } from '../../interface';
import { getGameChartPie } from '../../service';

export function useGetGameChartPie(params:ISearchForm) {
  return {
    ...useQuery([QUERY_KEYS.GAME_PIE_CHART,params], () => getGameChartPie(params), {
      cacheTime: 0,
    }),
  };
}