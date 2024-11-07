import { useMutation, useQueryClient } from 'react-query';
import { ICallback } from '../../subject-common/interface';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { editSubject } from '../service';

export const useEditSubject = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editSubject, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_SUBJECT]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
