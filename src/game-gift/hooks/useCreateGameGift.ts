import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

import { getRelatedCacheKeys } from '../../common/utils/getRelatedCacheKeys';
import { ICallback } from '../interfaces';
import { createGameGift, deleteGameGift } from '../services';
import useShowSnackbar from '../../common/hooks/useMessage';

export const useCreateGameGift = (callback: ICallback) => {
  const { showSuccessSnackbar, showErrorSnackbar } = useShowSnackbar();
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.GAME_GIFTS);
  return {
    ...useMutation(createGameGift, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.GAME_GIFTS]);
      },
      onError: (data: any) => {
        callback.onError && callback.onError();
        showErrorSnackbar(data.response.data.message ? data?.response?.data?.message : "Tạo mới thất bại" );
      },
    }),
  };
};
