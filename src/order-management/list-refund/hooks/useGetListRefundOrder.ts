import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import {  IParamsRefundedOrder } from '../interfaces';
import { getListRefundOrder } from '../services';

export function useGetListRefundOrder(params: IParamsRefundedOrder) {
  return {
    ...useQuery([QUERY_KEYS.LIST_REFUND_ORDER, params], () => getListRefundOrder(params), {
      cacheTime: 0,
    }),
  };
}
