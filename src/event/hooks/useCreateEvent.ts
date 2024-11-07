import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from '../../common/utils/getRelatedCacheKeys';
import { ICallback } from '../common/interfaces';
import { createEvent, deleteEvent } from '../common/services';

export const useCreateEvent = (callback: ICallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.CREATE_EVENT);
  return {
    ...useMutation(createEvent, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.CREATE_EVENT]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
