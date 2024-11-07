import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from '../../../common/utils/getRelatedCacheKeys';
import { ICallback } from '../../interface';
import { createNotifications } from '../../services';

export const useCreateNotification = (callback: ICallback) => {
  return {
    ...useMutation(createNotifications, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
