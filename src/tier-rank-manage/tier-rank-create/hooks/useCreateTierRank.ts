import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from '../../../common/utils/getRelatedCacheKeys';
import { ITierRankCallback } from '../../interface';
import { createTierRank } from '../../services';

export const useCreateTierRank = (callback: ITierRankCallback) => {
  return {
    ...useMutation(createTierRank, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
