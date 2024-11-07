import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';
import useMessage from '../../common/hooks/useMessage';
import { IParamsFilter } from '../interfaces';
import { importExternalReferrer } from '../services';

export function useImportExternalReferrer(params: IParamsFilter) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  return {
    ...useMutation(importExternalReferrer, {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_KEYS.LIST_EXTERNAL_REFERRER, params]);
        showSuccessSnackbar(t('manage_store.import.sucess'));
      },
      onError() {
        showErrorSnackbar(t('manage_store.import.false'));
      },
    }),
  };
}
