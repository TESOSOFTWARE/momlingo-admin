import { useMutation, useQueryClient } from 'react-query';
import useMessage from '../../common/hooks/useMessage';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { editExternalReferrer } from '../services';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';
import { PATH_DASHBOARD } from '../../common/routes/paths';

export function useEditExternalReferrer() {
  const queryClient = useQueryClient();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return {
    ...useMutation(editExternalReferrer, {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_KEYS.LIST_EXTERNAL_REFERRER]);
        showSuccessSnackbar(t('manage_store.editExternalReferrerSuccess'));
        navigate(PATH_DASHBOARD.manageStore.list);
      },
      onError() {
        showErrorSnackbar(t('manage_store.editExternalReferrerFailed'));
      },
    }),
  };
}
