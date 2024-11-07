import { useQueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICodeCallback } from '../../code-common/interface';
import { deleteCode } from '../list.service';

export function useDeleteCode(callback: ICodeCallback) {
  const queryClient = useQueryClient();
  return useMutation((code: string) => deleteCode(code), {
    onSuccess: () => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.LIST_CODE])
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
