import { useMutation, useQueryClient } from 'react-query';
import { createExternalReferrer } from '../services';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useMessage from '../../common/hooks/useMessage';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';
import { PATH_DASHBOARD } from '../../common/routes/paths';

export function useCreateExternalReferrer() {
  const queryClient = useQueryClient();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return {
    ...useMutation(createExternalReferrer, {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_KEYS.LIST_EXTERNAL_REFERRER]);
        showSuccessSnackbar(t('manage_store.createExternalReferrerSuccess'));
        navigate(PATH_DASHBOARD.manageStore.list);
      },
      onError() {
        showErrorSnackbar(t('manage_store.createExternalReferrerFailed'));
      },
    }),
  };
}
