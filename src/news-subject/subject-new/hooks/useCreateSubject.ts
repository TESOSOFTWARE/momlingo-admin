import { useMutation, useQueryClient } from 'react-query';
import { ICallback } from '../../subject-common/interface';
import { createSubject } from '../service';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';

export const useCreateSubject = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(createSubject, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.NEW_SUBJECT]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
