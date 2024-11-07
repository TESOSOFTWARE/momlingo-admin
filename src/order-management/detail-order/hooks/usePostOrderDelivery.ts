import { postOrderDelivery } from './../service';
import { useMutation, useQueryClient } from 'react-query';
import { ICallback } from '../../common/interface';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';

export const usePostOrderDelivery = ({ callback }: { callback: ICallback }) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(postOrderDelivery, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.ORDER_DELIVERY]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
