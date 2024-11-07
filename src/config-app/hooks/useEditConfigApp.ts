import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';
import { ICallback } from '../interfaces';
import { editConfigApp } from '../services';

export const useEditConfigApp = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editConfigApp, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.LIST_APP_CONFIG]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
