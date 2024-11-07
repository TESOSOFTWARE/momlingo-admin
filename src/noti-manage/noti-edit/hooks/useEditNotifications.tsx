import { useQueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { editNotifications } from '../../services';
import { ICallback } from '../../interface';

export const useEditNotifications = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editNotifications, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_NOTIFICATION]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
