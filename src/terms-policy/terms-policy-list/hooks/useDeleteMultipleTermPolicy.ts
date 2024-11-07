import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import useMessage from 'src/common/hooks/useMessage';
import { deleteMultipleTermPolicy } from '../../common/service';

export function useDeleteMultipleTermPolicy() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  return useMutation((ids: number[]) => deleteMultipleTermPolicy(ids), {
    onSuccess(data, variables, ctx) {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.LIST_EVENT])
        .forEach(({ queryKey }) => {
          queryClient.invalidateQueries(queryKey);
        });

      showSuccessSnackbar(
        t('termPolicy.common.delete.success', { length: data.affected })
      );

      const errorCount = data.affected - variables.length;
      if (errorCount) {
        showErrorSnackbar(
          t('termPolicy.common.delete.multiple_fail', { length: variables.length })
        );
      }
    },
    onError(error, variables, ctx) {
      showErrorSnackbar(
        t('termPolicy.common.delete.multiple_fail', { length: variables.length })
      );
    },
    retry: 2,
  });
}
