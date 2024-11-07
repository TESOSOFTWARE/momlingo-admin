import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { INewStore } from './../../common/interface';
import { useMutation, useQueryClient } from 'react-query';
import { ICallback } from '../../common/interface';
import { updateStore } from '../services';

export const useUpdateStore = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(updateStore, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.LIST_STORE_IN_MAP]);
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
