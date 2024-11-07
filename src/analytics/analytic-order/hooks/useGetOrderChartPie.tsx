import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import {   ISearchForm } from '../../interface';
import { getOrderChartPie } from '../../service';

export function useGetOrderChartPie(param:ISearchForm) {
  return {
    ...useQuery([QUERY_KEYS.ORDER_PIE_CHART,param], () => getOrderChartPie(param), {
      cacheTime: 0,
    }),
  };
}