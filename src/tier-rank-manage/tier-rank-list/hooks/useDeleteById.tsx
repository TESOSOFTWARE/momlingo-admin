import { useTranslation } from 'react-i18next';
import useMessage from '../../../common/hooks/useMessage';
import { useQueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { deleteTierRankById } from '../../services';
// import { IListTierRankParams } from '../../interface';

export function useDeleteById(params: any) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  return useMutation((id: number) => deleteTierRankById(id), {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.LIST_TIER_RANK, params]);
      showSuccessSnackbar(t('survey.action.delete.success'));
    },
    onError() {
      showErrorSnackbar(t('survey.action.delete.fail'));
    },
  });
}
