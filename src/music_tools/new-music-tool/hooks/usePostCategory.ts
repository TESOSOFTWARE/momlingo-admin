import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback } from '../../common/interface';
import { postCategory } from '../service';

export const usePostCategory = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(postCategory, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.LIST_MUSIC]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
