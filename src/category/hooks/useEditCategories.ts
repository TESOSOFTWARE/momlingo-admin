import { useMutation, useQueryClient } from 'react-query';
import { ICallback } from '../common/interface';
import { editCategory } from '../common/services';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';

export const useEditCategory = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editCategory, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_CATEGORY]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
