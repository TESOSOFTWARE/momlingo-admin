import { useQueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IProductCallback } from '../interface/interface';
import { postProductAttribute } from '../../product-attribute-list/service';
import { getRelatedCacheKeys } from '../../../common/utils/getRelatedCacheKeys';

export const usePostProductAttribute = (callback: IProductCallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.POST_PRODUCT_ATTRIBUTE);
  return {
    ...useMutation(postProductAttribute, {
      onSuccess: (_result, _variables) => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
