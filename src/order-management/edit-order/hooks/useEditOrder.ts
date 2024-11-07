import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback } from '../../common/interface';
import { editOrder } from '../service';

export const useEditOrder = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editOrder, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.LIST_ORDER]);
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
