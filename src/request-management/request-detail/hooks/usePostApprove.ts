import { postApprove } from '../service';
import { useMutation, useQueryClient } from 'react-query';
import { ICallback, IDataRes } from '../interface';
import { getRelatedCacheKeys } from 'src/common/utils/getRelatedCacheKeys';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import useMessage from 'src/common/hooks/useMessage';
import vn from '../../../common/locales/vn';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export const usePostApprove = (callback: ICallback, fileId: number) => {
  const queryClient = useQueryClient();
  const { showErrorSnackbar } = useMessage();
  const navigate = useNavigate();

  return {
    ...useMutation(postApprove, {
      onSuccess: () => {
        navigate(PATH_DASHBOARD.requestManage.list);
        callback.onSuccess && callback.onSuccess();
        queryClient.invalidateQueries([QUERY_KEYS.REQUEST_BY_ID, fileId]);
      },
      onError: (data: IDataRes) => {
        data?.response?.data?.statusCode === 403
          ? showErrorSnackbar(vn.noPermission)
          : showErrorSnackbar(data?.response?.data?.message);
      },
    }),
  };
};
