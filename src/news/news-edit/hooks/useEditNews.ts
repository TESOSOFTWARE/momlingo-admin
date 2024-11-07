import { useQueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { INewsCallback } from '../../news-common/interface';
import { editNews } from '../service';

export const useEditNews = (callback: INewsCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editNews, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_PRODUCT]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
