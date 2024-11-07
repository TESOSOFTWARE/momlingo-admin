import { useTranslation } from 'react-i18next';
import useMessage from '../../../common/hooks/useMessage';
import { useQueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IListPopupParams } from '../../interface';
import { deletePopupById } from '../../services';

export function useDeleteById(params: IListPopupParams) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  return useMutation(deletePopupById, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.LIST_POPUP, params]);
      showSuccessSnackbar(t('survey.action.delete.success'));
    },
    onError() {
      showErrorSnackbar(t('survey.action.delete.fail'));
    },
  });
}
