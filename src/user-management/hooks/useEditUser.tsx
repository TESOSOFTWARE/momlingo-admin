import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from '../../common/utils/getRelatedCacheKeys';
import { ICallback } from '../interfaces';
import { changeUserStatusAccount, changeUserStatusAddPoint, editUser } from '../services';

export default function useEditUser(callback: ICallback) {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.USER_BY_ID);
  return {
    ...useMutation(editUser, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.USER_BY_ID]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
}
