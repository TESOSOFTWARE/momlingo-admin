import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "../../../common/constants/queryKeys.constant";
import useMessage from '../../../common/hooks/useMessage';
import { IParams } from "../interface";
import { requestImport } from "../services";

export function useImportStoreMap(params: IParams) {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  
    return {
      ...useMutation(requestImport, {
        onSuccess() {
          queryClient.invalidateQueries([QUERY_KEYS.LIST_STORE_IN_MAP,params]);
          showSuccessSnackbar(t('manage_store.import.sucess'));
        },
        onError() {
          showErrorSnackbar(t('manage_store.import.false'));
        },
      }),
    };
  }