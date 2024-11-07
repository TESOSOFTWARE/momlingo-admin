import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

import { ICallback } from '../../interfaces';
import { getRelatedCacheKeys } from '../../../common/utils/getRelatedCacheKeys';
import { deleteMultiGroupUser } from '../services';

export const useDeleteMultipleGroupUser = (callback: ICallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.LIST_GROUP_USER);
  return {
    ...useMutation(deleteMultiGroupUser, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.LIST_GROUP_USER]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
