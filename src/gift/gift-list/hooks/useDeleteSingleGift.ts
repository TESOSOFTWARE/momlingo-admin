import { useTranslation } from 'react-i18next';
import useMessage from '../../../common/hooks/useMessage';
import { useQueryClient, useMutation } from 'react-query';
import { deleteSingleGift } from '../../common/services';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IGetListParams } from '../../common/interface';

export function useDeleteSingleGift(params: IGetListParams) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  return useMutation((id: number) => deleteSingleGift(id), {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.LIST_EVENT, params]);
      showSuccessSnackbar(t('deleteGiftSuccess'));
    },
    onError() {
      showErrorSnackbar(t('deleteGiftFailed'));
    },
  });
}
