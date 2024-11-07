import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from '../../common/utils/getRelatedCacheKeys';
import { ICallback } from '../interfaces';
import { changeUserStatusAddPoint } from '../services';

export default function useChangeUserStatusAddPoint(callback: ICallback) {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.LIST_USER);
  return {
    ...useMutation(changeUserStatusAddPoint, {
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
