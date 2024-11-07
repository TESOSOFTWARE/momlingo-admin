import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IQRCallback } from '../interfaces';
import { getRelatedCacheKeys } from '../../common/utils/getRelatedCacheKeys';
import { createSpoonCode } from '../services';

export const useCreateSpoonCode = (callback: IQRCallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.SPOON_CODE);
  return {
    ...useMutation(createSpoonCode, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.SPOON_CODE]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
