import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import useMessage from 'src/common/hooks/useMessage';
import { deleteMultipleGamePlaytimeConfig } from '../../common/service';

export function useDeleteMultipleGamePlaytime() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  return useMutation((ids: number[]) => deleteMultipleGamePlaytimeConfig(ids), {
    onSuccess(data, variables, ctx) {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.LIST_GAME_CONFIG_PLAYTIME])
        .forEach(({ queryKey }) => {
          queryClient.invalidateQueries(queryKey);
        });

      showSuccessSnackbar(
        t('configPlayTime.list.action.delete.multiple_success', { length: data.affected })
      );

      const errorCount = data.affected - variables.length;
      if (errorCount) {
        showErrorSnackbar(
          t('configPlayTime.list.action.delete.multiple_failed', { length: variables.length })
        );
      }
    },
    onError(error, variables, ctx) {
      showErrorSnackbar(
        t('group_policy.list.delete.multiple_fail', { length: variables.length })
      );
    },
    retry: 2,
  });
}
