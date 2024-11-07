import { useQueryClient, useMutation } from 'react-query';
import { ISurveyCallback } from '../../../common/survey.interface';
import { requestExport } from '../../common/service';

export const useRequestExport = (callback: ISurveyCallback) => {
  return {
    ...useMutation(requestExport, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
