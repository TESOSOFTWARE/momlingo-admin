import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback, IDataStoreDelete, IParams } from '../interface';
import { deleteMultiStore } from '../services';

export function useDeleteMultiStore(callback: ICallback,searchParams:IParams) {
  const queryClient = useQueryClient();
  return useMutation((data: IDataStoreDelete) => deleteMultiStore(data), {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.LIST_STORE_IN_MAP,searchParams])
        
      callback.onSuccess && callback.onSuccess();
    },

    onError() {
      callback.onError && callback.onError();
    },
  });
}
