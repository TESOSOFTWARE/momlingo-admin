import { newAgent } from '../service';
import { useMutation, useQueryClient } from 'react-query';
import { ICallback } from '../../common/interface';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';

export const useNewAgent = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(newAgent, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.NEW_PRODUCT]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
