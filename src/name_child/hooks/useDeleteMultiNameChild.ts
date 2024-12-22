import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

import { getRelatedCacheKeys } from '../../common/utils/getRelatedCacheKeys';

import { ICallback } from '../common/interface';
import { deleteMultiCategory, deleteMultiName } from '../common/services';

// export const useDeleteMultipleNameChild = (callback: ICallback) => {
//   const queryClient = useQueryClient();
//   const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.NAME_BABY_TRACKER);
//   return {
//     ...useMutation(deleteMultiCategory, {
//       onSuccess: () => {
//         keys.forEach((queryKey) => {
//           queryClient.invalidateQueries(queryKey);
//         });
//         callback.onSuccess && callback.onSuccess();
//         queryClient.invalidateQueries([QUERY_KEYS.LIST_CATEGORY]);
//       },
//       onError: () => {
//         callback.onError && callback.onError();
//       },
//     }),
//   };
// };
export const useDeleteMultipleNameChild = (callback: ICallback) => {
  const queryClient = useQueryClient();
  const keys = getRelatedCacheKeys(queryClient, QUERY_KEYS.NAME_BABY_TRACKER);
  return {
    ...useMutation(deleteMultiName, {
      onSuccess: () => {
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.LIST_CATEGORY]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
