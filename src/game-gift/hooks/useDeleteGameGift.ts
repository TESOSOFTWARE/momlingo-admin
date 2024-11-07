import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

import { getRelatedCacheKeys } from '../../common/utils/getRelatedCacheKeys';
import { ICallback } from '../interfaces';
import { deleteGameGift } from '../services';

export const useDeleteGameGift = (callback: ICallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.GAME_GIFTS);
  return {
    ...useMutation(deleteGameGift, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.GAME_GIFTS]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
