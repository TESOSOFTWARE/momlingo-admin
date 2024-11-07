import { useQueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IGameCallback } from '../../interface';
import { editGame } from '../../services';

export const useEditGame = (callback: IGameCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editGame, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_GAME]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
