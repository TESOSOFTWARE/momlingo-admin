import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback } from '../../common/interface';
import { postCategory, postName } from '../service';

export const usePostName = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(postName, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.NAME_BABY_TRACKER]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
