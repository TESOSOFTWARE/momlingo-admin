import { useMutation, useQueryClient } from 'react-query';
import { ITermPolicyCallback } from '../../common/type';
import { createNewTermPolicy } from '../../common/service';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';

export const useCreateTermPolicy = (callback: ITermPolicyCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(createNewTermPolicy, {
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
