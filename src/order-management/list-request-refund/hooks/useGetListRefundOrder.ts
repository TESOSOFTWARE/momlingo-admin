import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsRefundedOrderRequest } from '../interfaces';
import { getListRefundOrderRequest } from '../services';

export function useGetListRefundOrderRequest(params: IParamsRefundedOrderRequest) {
  return {
    ...useQuery(
      [QUERY_KEYS.LIST_REFUND_ORDER, params],
      () => getListRefundOrderRequest(params),
      {
        cacheTime: 0,
      }
    ),
  };
}
