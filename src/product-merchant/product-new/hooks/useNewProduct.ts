import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IProductCallback } from '../../product-common/interface';
import { newProduct } from '../new-service';

export const useNewProduct = (callback: IProductCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(newProduct, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.NEW_PRODUCT]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
