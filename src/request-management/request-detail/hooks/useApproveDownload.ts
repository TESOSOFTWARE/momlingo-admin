import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ICallback, IDataRes } from '../interface';
import { approveDownload, postReject, rejectDownload } from '../service';
import useMessage from 'src/common/hooks/useMessage';
import vn from '../../../common/locales/vn';

export const useApproveDownload = (callback: ICallback, fileId: number) => {
  const queryClient = useQueryClient();
  const { showErrorSnackbar } = useMessage();

  return {
    ...useMutation(approveDownload, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.REQUEST_BY_ID, fileId]);
      },
      onError: (data: IDataRes) => {
        data?.response?.data?.statusCode === 403
          ? showErrorSnackbar(vn.noPermission)
          : callback.onError && callback.onError();
      },
    }),
  };
};
