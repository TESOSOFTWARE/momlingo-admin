import { useTranslation } from 'react-i18next';

import { useQueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { deleteNotificationsById } from '../../services';
import { ICallback, IDataDelete } from '../../interface';
import { getRelatedCacheKeys } from '../../../common/utils/getRelatedCacheKeys';

export function useDeleteNotiById(callback: ICallback) {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.LIST_NOTIFICATIONS);
  return {
    ...useMutation(deleteNotificationsById, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.LIST_NOTIFICATIONS]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
}
