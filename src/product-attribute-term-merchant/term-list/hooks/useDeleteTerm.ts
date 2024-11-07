import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IAttributeTermCallback } from '../../term-common/interface';
import { deleteTerm } from '../service';

export function useDeleteTerm(callback: IAttributeTermCallback) {
  const queryClient = useQueryClient();
  return useMutation(({ ids }: { ids: number[] }) => deleteTerm({ ids: ids }), {
    onSuccess: () => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.LIST_PRODUCT_ATTRIBUTE_TERM])
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
