import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IGroupPolicyCallback } from '../../common/interface';
import { editGroupPolicy } from '../../common/service';

export const useMutateEditGroupPolicy = (callback: IGroupPolicyCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editGroupPolicy, {
      onSuccess: (_result, variables) => {
        queryClient
          .getQueryCache()
          .findAll([QUERY_KEYS.LIST_GROUP_POLICY])
          .forEach(({ queryKey }) => {
            queryClient.invalidateQueries(queryKey);
          });
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
