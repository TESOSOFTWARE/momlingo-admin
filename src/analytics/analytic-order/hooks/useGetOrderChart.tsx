import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import {  ISearchForm } from '../../interface';
import { getOrderChart } from '../../service';

export function useGetOrderChart(param:ISearchForm) {
  return {
    ...useQuery([QUERY_KEYS.ORDER_LINE_CHART,param], () => getOrderChart(param), {
      cacheTime: 0,
    }),
  };
}
