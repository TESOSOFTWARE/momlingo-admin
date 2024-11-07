import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IDeleteParams } from '../interface';
import { deleteNews } from '../service';
import { INewsCallback } from '../../news-common/interface';

export function useDeleteNews(callback: INewsCallback) {
  const queryClient = useQueryClient();
  return useMutation((params: IDeleteParams) => deleteNews(params), {
    onSuccess: () => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.LIST_NEWS])
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
