import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback } from '../../common-variant/interface';
import { IDeleteProp } from '../interface';
import { deleteVariant } from '../service';

export function useDeleteVariant(callback: ICallback) {
  const queryClient = useQueryClient();
  return useMutation((params: IDeleteProp) => deleteVariant(params), {
    onSuccess: () => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.LIST_PRODUCT_VARIANT])
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
