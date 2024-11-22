import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

import { getRelatedCacheKeys } from '../../common/utils/getRelatedCacheKeys';
import { ICallback } from '../interfaces';
import { createGameGift, deleteGameGift, editGameGift } from '../services';
import useShowSnackbar from '../../common/hooks/useMessage';

export const useEditGameGift = (callback: ICallback) => {
  const queryClient = useQueryClient();
  const { showSuccessSnackbar, showErrorSnackbar } = useShowSnackbar();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.GAME_GIFTS);
  return {
    ...useMutation(editGameGift, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.GAME_GIFTS]);
      },
      onError: (data: any) => {
        callback.onError && callback.onError();
        showErrorSnackbar(
          data.response.data.message
            ? data?.response?.data?.message
            : 'Chỉnh sửa thất bại!'
        );
      },
    }),
  };
};
