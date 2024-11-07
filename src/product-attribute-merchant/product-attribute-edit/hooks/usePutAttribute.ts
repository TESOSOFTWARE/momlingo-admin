import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback } from '../interface';
import { putAttribute } from './../service';

export const usePutAttribute = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(putAttribute, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_PRODUCT_ATTRIBUTE]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
