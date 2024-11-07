import { useTranslation } from 'react-i18next';
import useMessage from 'src/common/hooks/useMessage';
import { useQueryClient, useMutation } from 'react-query';
import { deleteSingleGroupPolicy } from '../../common/service';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';

export function useDeleteSingleGroupPolicy() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  return useMutation((id: number) => deleteSingleGroupPolicy(id), {
    onSuccess() {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.LIST_GROUP_POLICY])
        .forEach(({ queryKey }) => {
          queryClient.invalidateQueries(queryKey);
        });
      showSuccessSnackbar(t('group_policy.list.delete.success'));
    },
    onError() {
      showErrorSnackbar(t('group_policy.list.delete.fail'));
    },
  });
}
