import { useTranslation } from 'react-i18next';
import useMessage from '../../../common/hooks/useMessage';
import { useQueryClient, useMutation } from 'react-query';
import { deleteSurveyById } from '../../common/survey.service';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IGetListSurveysParams } from '../../common/survey.interface';

export function useDeleteSurveyById(params: IGetListSurveysParams) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  return useMutation((id: number) => deleteSurveyById(id), {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.LIST_SURVEYS]);
      showSuccessSnackbar(t('survey.action.delete.success'));
    },
    onError() {
      showErrorSnackbar(t('survey.action.delete.fail'));
    },
  });
}
