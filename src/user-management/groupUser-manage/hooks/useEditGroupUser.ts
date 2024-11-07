import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ICallback } from '../../interfaces';
import { getRelatedCacheKeys } from '../../../common/utils/getRelatedCacheKeys';
import { createGroupUser, editGroupUser, editGroupUserPickAll } from '../services';

export const useEditGroupUser = (callback: ICallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.EDIT_GROUP_USER);
  return {
    ...useMutation(editGroupUser, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_GROUP_USER]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};

export const useEditGroupUserAll = (callback: ICallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.EDIT_GROUP_USER);
  return {
    ...useMutation(editGroupUserPickAll, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_GROUP_USER]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
