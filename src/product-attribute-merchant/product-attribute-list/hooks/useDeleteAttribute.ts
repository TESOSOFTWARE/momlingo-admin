import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback, IParamsDelete } from '../interface/interface';
import { deleteProductAttribute } from '../service';

export function useDeleteAttribute(callback: ICallback) {
  const queryClient = useQueryClient();
  return useMutation((params: IParamsDelete) => deleteProductAttribute(params), {
    onSuccess: () => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.LIST_PRODUCT_ATTRIBUTE])
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
