import { useMutation, useQueryClient } from 'react-query';
import { ICallback } from '../common/interface';
import { editCategory, editNameById } from '../common/services';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';

export const useEditName = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editNameById, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.NAME_BABY_TRACKER]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
