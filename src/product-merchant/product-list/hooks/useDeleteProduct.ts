import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IProductCallback } from '../../product-common/interface';
import { deleteProduct } from '../product-service';
import { IDeleteParams } from '../product-interface';

export function useDeleteProduct(callback: IProductCallback) {
  const queryClient = useQueryClient();
  return useMutation((params: IDeleteParams) => deleteProduct(params), {
    onSuccess: () => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.LIST_PRODUCT])
        .forEach(({ queryKey }) => {
          queryClient.invalidateQueries(queryKey);
        });
      callback.onSuccess && callback.onSuccess();
    },
    onError: () => {
      callback.onError && callback.onError();
    },
    retry: 2,
  });
}
