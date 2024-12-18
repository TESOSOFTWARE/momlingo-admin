import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IFormCallback } from '../../common/interface';
import { createGamePlaytimeConfig } from '../../common/service';

export const useMutateCreateConfigPlayTime = (callback: IFormCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(createGamePlaytimeConfig, {
      onSuccess: (_result, variables) => {
        queryClient
          .getQueryCache()
          .findAll([QUERY_KEYS.LIST_GAME_CONFIG_PLAYTIME])
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
