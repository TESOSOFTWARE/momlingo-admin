import { useQueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ITierRankCallback } from '../../interface';
import { editTierRank } from '../../services';

export const useEditTierRank = (callback: ITierRankCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editTierRank, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_TIER_RANK]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
