import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback } from '../../common/interface';
import { postStore } from '../service';

export const usePostStore = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(postStore, {
      onSuccess: (_result, variables) => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
