import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ICallback } from '../interface';
import { approveDownload, postReject, rejectDownload, requestDownload } from '../service';

export const useRequestDownload = (callback: ICallback, fileId: number) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(requestDownload, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.REQUEST_BY_ID, fileId]);
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
