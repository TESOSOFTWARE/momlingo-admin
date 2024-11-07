import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from '../../common/utils/getRelatedCacheKeys';
import { ICallback } from '../interfaces';
import { changeUserStatusAccount, changeUserStatusAddPoint } from '../services';

export default function useChangeUserStatusAccount(callback: ICallback) {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.LIST_USER);
  return {
    ...useMutation(changeUserStatusAccount, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.LIST_USER]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
}
