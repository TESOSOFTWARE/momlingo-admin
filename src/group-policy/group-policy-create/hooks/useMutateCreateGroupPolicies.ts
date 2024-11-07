import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IGroupPolicyCallback } from '../../common/interface';
import { createGroupPolicy } from '../../common/service';

export const useMutateCreateGroupPolicy = (callback: IGroupPolicyCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(createGroupPolicy, {
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
