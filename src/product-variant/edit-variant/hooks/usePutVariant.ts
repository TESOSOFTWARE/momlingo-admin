import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback } from '../../common-variant/interface';
import { putVariant } from '../service';

export const usePutVariant = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(putVariant, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_PRODUCT_VARIANT]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
