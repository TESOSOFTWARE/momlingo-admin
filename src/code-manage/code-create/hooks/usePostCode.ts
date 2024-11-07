import { useQueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICodeCallback } from '../../code-common/interface';
import { postCode } from '../create.service';

export const usePostCode = (callback: ICodeCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(postCode, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.POST_CODE]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
