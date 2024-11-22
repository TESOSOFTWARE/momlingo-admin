import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ICallback } from '../interface';
import { editShareAppConfig } from '../service';

export const useEditShareAppConfig = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editShareAppConfig, {
      onSuccess: (_result, variables) => {
        queryClient
          .getQueryCache()
          .findAll([QUERY_KEYS.GET_SHARE_APP_CONFIG])
          .forEach(({ queryKey }) => {
            queryClient.invalidateQueries(queryKey);
          });
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
