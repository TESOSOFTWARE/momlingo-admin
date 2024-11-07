import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IQRCallback } from '../interfaces';
import { getRelatedCacheKeys } from '../../common/utils/getRelatedCacheKeys';
import { createSBPSCode } from '../services';

export const useCreateSBPSCode = (callback: IQRCallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.SBPS_CODE);
  return {
    ...useMutation(createSBPSCode, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.SBPS_CODE]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
