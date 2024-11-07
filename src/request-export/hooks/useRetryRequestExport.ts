import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from '../../common/utils/getRelatedCacheKeys';
import { ICallback } from '../interfaces';
import { retryRequestExport } from '../services';

export const useRetryRequestExport = (callback: ICallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.REQUEST_EXPORT_LIST);
  return {
    ...useMutation(retryRequestExport, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.REQUEST_EXPORT_LIST]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
