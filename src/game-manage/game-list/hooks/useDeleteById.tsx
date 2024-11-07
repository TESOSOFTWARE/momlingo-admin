import { useTranslation } from 'react-i18next';
import useMessage from '../../../common/hooks/useMessage';
import { useQueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { deleteGameById } from '../../services';
// import { IListGameParams } from '../../interface';

export function useDeleteById(params: any) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  return useMutation((id: number) => deleteGameById(id), {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.LIST_GAME, params]);
      showSuccessSnackbar(t('survey.action.delete.success'));
    },
    onError() {
      showErrorSnackbar(t('survey.action.delete.fail'));
    },
  });
}
