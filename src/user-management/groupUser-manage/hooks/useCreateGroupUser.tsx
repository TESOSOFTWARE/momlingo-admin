import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ICallback } from '../../interfaces';
import { getRelatedCacheKeys } from '../../../common/utils/getRelatedCacheKeys';
import { createGroupUser, createGroupUserAll } from '../services';

export const useCreateGroupUser = (callback: ICallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.CREATE_GROUP_USER);
  return {
    ...useMutation(createGroupUser, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.CREATE_GROUP_USER]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};

export const useCreateGroupUserAll = (callback: ICallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.CREATE_GROUP_USER);
  return {
    ...useMutation(createGroupUserAll, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.CREATE_GROUP_USER]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
