import { useQueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ILimitSpoonCodeCallback } from '../list-interface';
import { editLimitSpoonCode } from '../service';

export const useEditLimitSpoonCode = (callback: ILimitSpoonCodeCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editLimitSpoonCode, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.LIMIT_SPOON_CODE]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
