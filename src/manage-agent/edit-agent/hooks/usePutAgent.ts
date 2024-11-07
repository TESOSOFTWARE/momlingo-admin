import { putAgent } from './../service';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback } from '../../common/interface';

export const usePutAgent = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(putAgent, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.PUT_AGENT]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
