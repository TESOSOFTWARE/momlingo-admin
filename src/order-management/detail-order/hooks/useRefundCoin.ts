import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ICallback } from '../../common/interface';
import { getRelatedCacheKeys } from '../../../common/utils/getRelatedCacheKeys';
import { refundCoin } from '../service';

export default function useRefundPointOrder(callback: ICallback) {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.GET_ORDER_BY_ID);
  return {
    ...useMutation(refundCoin, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.GET_ORDER_BY_ID]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
}
