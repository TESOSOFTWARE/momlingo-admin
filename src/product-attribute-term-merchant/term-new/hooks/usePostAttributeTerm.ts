import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IAttributeTermCallback } from '../../term-common/interface';
import { postAttributeTerm } from './../service';

export const usePostAttributeTerm = (callback: IAttributeTermCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(postAttributeTerm, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.NEW_PRODUCT_ATTRIBUTE_TERM]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
