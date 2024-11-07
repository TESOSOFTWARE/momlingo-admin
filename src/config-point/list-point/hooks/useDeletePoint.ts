import { IDeletePoint } from './../interface';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback } from '../../common/interface';
import { deletePoint } from '../service';

export function useDeletePoint(callback: ICallback) {
  const queryClient = useQueryClient();
  return useMutation((ids: IDeletePoint) => deletePoint({ data: ids }), {
    onSuccess: () => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.LIST_POINT])
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
