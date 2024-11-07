import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { ICallback, IDataRes } from '../interface';
import { postReject } from '../service';
import useMessage from 'src/common/hooks/useMessage';
import vn from '../../../common/locales/vn';

export const usePostReject = (callback: ICallback, fileId: number) => {
  const queryClient = useQueryClient();
  const { showErrorSnackbar } = useMessage();
  const navigate = useNavigate();

  return {
    ...useMutation(postReject, {
      onSuccess: () => {
        navigate(PATH_DASHBOARD.requestManage.list);
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
