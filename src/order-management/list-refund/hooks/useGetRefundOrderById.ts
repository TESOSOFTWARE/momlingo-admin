import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRefundOrderById } from '../services';

export function useGetRefundOrderById(id: number) {
  return {
    ...useQuery([QUERY_KEYS.REFUND_ORDER_BY_ID, id], () => getRefundOrderById(id), {
      cacheTime: 0,
    }),
  };
}
