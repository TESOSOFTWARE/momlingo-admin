import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICodeCallback } from '../../code-common/interface';
import { editCode } from '../edit.service';

export const useEditCode = (callback: ICodeCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editCode, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_CODE]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
