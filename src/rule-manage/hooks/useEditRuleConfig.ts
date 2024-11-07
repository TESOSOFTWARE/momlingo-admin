import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';
import { editConfigRule } from '../services';
import { ICallback } from '../interfaces';

export function useEditRuleConfig(callback: ICallback) {
  const queryClient = useQueryClient();
  return useMutation(editConfigRule, {
    onSuccess: () => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.RULE_CONFIG])
        .forEach(({ queryKey }) => {
          queryClient.invalidateQueries(queryKey);
        });
      callback.onSuccess && callback.onSuccess();
    },
    onError: () => {
      callback.onError && callback.onError();
    },
    retry: 2,
  });
}
