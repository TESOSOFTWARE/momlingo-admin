import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IAttributeTermCallback } from '../../term-common/interface';
import { putTerm } from '../service';

export const usePutTerm = (callback: IAttributeTermCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(putTerm, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_PRODUCT_TERM]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
