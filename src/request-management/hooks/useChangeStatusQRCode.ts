import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ICallback, IListQRCodeParams, IParamsChangeStatus } from '../interfaces';
import { changeStatus } from '../services';
import { getRelatedCacheKeys } from '../../common/utils/getRelatedCacheKeys';

export default function useChangeStatusQRCode(callback: ICallback) {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.QR_CODE_LIST);
  return {
    ...useMutation(changeStatus, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.QR_CODE_LIST]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
}
