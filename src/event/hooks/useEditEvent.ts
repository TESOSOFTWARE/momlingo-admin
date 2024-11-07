import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from '../../common/utils/getRelatedCacheKeys';
import { ICallback } from '../common/interfaces';
import { deleteEvent, editEvent } from '../common/services';

export const useEditEvent = (callback: ICallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.EDIT_EVENT);
  return {
    ...useMutation(editEvent, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_EVENT]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
