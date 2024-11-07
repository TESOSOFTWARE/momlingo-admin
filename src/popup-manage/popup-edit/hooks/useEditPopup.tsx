import { useQueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IPopupCallback } from '../../interface';
import { editPopup } from '../../services';

export const useEditPopup = (callback: IPopupCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editPopup, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_POPUP]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
