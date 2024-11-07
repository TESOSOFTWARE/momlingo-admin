import { useTranslation } from 'react-i18next';
import useMessage from 'src/common/hooks/useMessage';
import { useQueryClient, useMutation } from 'react-query';
import { deleteSingleGamePlayTimeConfig } from '../../common/service';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';

export function useDeleteSingleGamePlayTime() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  return useMutation((id: number) => deleteSingleGamePlayTimeConfig(id), {
    onSuccess() {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.LIST_GAME_CONFIG_PLAYTIME])
        .forEach(({ queryKey }) => {
          queryClient.invalidateQueries(queryKey);
        });
      showSuccessSnackbar(t('configPlayTime.list.action.delete.success'));
    },
    onError() {
      showErrorSnackbar(t('configPlayTime.list.action.delete.failed'));
    },
  });
}
