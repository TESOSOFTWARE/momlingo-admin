import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from '../../../common/utils/getRelatedCacheKeys';
import { IGameCallback } from '../../interface';
import { createGame } from '../../services';

export const useCreateGame = (callback: IGameCallback) => {
  return {
    ...useMutation(createGame, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
