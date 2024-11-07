import { ICallback, IDeleteId } from './../interface';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { deleteAgent } from '../service';

export function useDeleteAgent(callback: ICallback) {
  const queryClient = useQueryClient();
  return useMutation((params: IDeleteId) => deleteAgent(params), {
    onSuccess: () => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.GET_LIST_AGENT])
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
