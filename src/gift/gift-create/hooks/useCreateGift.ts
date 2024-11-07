import { useTranslation } from 'react-i18next';
import useMessage from '../../../common/hooks/useMessage';
import { IFormCreateGift } from './../../common/interface';
import { useMutation, useQueryClient } from 'react-query';
import { createGift } from '../../common/services';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export const useCreateGift = () => {
  const queryClient = useQueryClient();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return {
    ...useMutation(createGift, {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_KEYS.LIST_GIFT]);
        showSuccessSnackbar(t('createGiftSuccess'));
        navigate(PATH_DASHBOARD.gift.list);
      },
      onError() {
        showErrorSnackbar(t('createGiftFailed'));
      },
    }),
  };
};
