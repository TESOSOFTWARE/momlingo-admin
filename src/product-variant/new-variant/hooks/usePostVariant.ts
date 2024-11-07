import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IProductCallback } from '../../../product-merchant/product-common/interface';
import { postVariant } from '../service';

export const usePostVariant = (callback: IProductCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(postVariant, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.NEW_PRODUCT_VARIANT]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
