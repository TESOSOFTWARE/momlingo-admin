import { useMutation, useQueryClient } from 'react-query';
import { ITermPolicyCallback } from '../../common/type';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { updateTermPolicy } from '../../common/service';

export const useUpdateTermPolicy = (callback: ITermPolicyCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(updateTermPolicy, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.CREATE_TERM_POLICY]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
