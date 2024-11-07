import { useQueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ISurveyCallback } from '../../common/survey.interface';
import { editSurvey } from '../../common/survey.service';

export const useEditSurvey = (callback: ISurveyCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editSurvey, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_SURVEY]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
