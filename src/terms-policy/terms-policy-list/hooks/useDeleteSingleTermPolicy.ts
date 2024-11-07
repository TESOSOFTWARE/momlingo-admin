import { useTranslation } from 'react-i18next';
import useMessage from 'src/common/hooks/useMessage';
import { useQueryClient, useMutation } from 'react-query';
import { deleteSingleTermPolicy } from '../../common/service';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';

export function useDeleteSingleTermPolicy() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  return useMutation((id: number) => deleteSingleTermPolicy(id), {
    onSuccess() {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.LIST_TERM_POLICY])
        .forEach(({ queryKey }) => {
          queryClient.invalidateQueries(queryKey);
        });
      showSuccessSnackbar(t('deleteGiftSuccess'));
    },
    onError() {
      showErrorSnackbar(t('deleteGiftFailed'));
    },
  });
}
