import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ISurveyCallback } from '../../common/survey.interface';
import { createSurvey } from '../../common/survey.service';

export const useSurveyCreate = (callback: ISurveyCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(createSurvey, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.CREATE_SURVEY]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
