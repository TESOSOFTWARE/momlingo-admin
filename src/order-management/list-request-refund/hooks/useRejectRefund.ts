import { useTranslation } from 'react-i18next';
import useMessage from '../../../common/hooks/useMessage';
import { useQueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { rejectRefund } from '../services';
import { IParamsRefundedOrderRequest } from '../interfaces';

export function useRejectRefund(params: IParamsRefundedOrderRequest) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  return useMutation(rejectRefund, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.LIST_REFUND_ORDER, params]);
      showSuccessSnackbar(t('order.detail.refundRequest.reject.sucess'));
    },
    onError() {
      showErrorSnackbar(t('order.detail.refundRequest.reject.fail'));
    },
  });
}
