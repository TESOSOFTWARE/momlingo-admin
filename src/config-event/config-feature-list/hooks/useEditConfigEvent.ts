import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IConfigEventCallback } from '../config-event-interface';
// import { IProductCallback } from '../../product-common/interface';
import { editConfigEvent } from '../config-event-service';

export function useEditConfigEvent(callback: IConfigEventCallback) {
  const queryClient = useQueryClient();
  return useMutation(editConfigEvent, {
    onSuccess: () => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.LIST_CONFIG_EVENT])
        .forEach(({ queryKey }) => {
          queryClient.invalidateQueries(queryKey);
        });
      callback.onSuccess && callback.onSuccess();
    },
    onError: () => {
      callback.onError && callback.onError();
    },
    retry: 2,
  });
}
