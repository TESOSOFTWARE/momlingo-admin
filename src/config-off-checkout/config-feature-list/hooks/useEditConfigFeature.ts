import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IConfigFeatureCallback } from '../config-feature-interface';
// import { IProductCallback } from '../../product-common/interface';
import { editConfigFeature } from '../config-feature-service';

export function useEditConfigFeature(callback: IConfigFeatureCallback) {
  const queryClient = useQueryClient();
  return useMutation(editConfigFeature, {
    onSuccess: () => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.LIST_CONFIG_FEATURE])
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
