import { useMutation, useQueryClient } from 'react-query';
import useMessage from '../../common/hooks/useMessage';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { deleteStore, editExternalReferrer } from '../services';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';
import { PATH_DASHBOARD } from '../../common/routes/paths';

export function useDeleteStore() {
  const queryClient = useQueryClient();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return {
    ...useMutation(deleteStore, {
      onSuccess: ()  => {
        queryClient.invalidateQueries([QUERY_KEYS.LIST_EXTERNAL_REFERRER]);
        // callback.onSuccess && callback.onSuccess();
        showSuccessSnackbar('Xoá cửa hàng thành công!');
      },
      onError: (data: any) => {
        // callback.onError && callback.onError();
        showErrorSnackbar(data?.response?.data?.message);

      },
    }),
  };
}
