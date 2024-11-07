import { useQueryClient, useMutation } from 'react-query';
import { ISurveyCallback } from '../../../common/survey.interface';
import { requestExportDetail } from '../../common/service';

export const useRequestExportUserDetail = (callback: ISurveyCallback) => {
  return {
    ...useMutation(requestExportDetail, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
