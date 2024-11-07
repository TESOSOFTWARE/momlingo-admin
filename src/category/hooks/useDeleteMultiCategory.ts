import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

import { getRelatedCacheKeys } from '../../common/utils/getRelatedCacheKeys';

import { ICallback } from '../common/interface';
import { deleteMultiCategory } from '../common/services';

export const useDeleteMultipleCategory = (callback: ICallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.LIST_CATEGORY);
  return {
    ...useMutation(deleteMultiCategory, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.LIST_CATEGORY]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
