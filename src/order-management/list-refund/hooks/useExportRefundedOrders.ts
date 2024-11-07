import { useQueryClient, useMutation } from 'react-query';
import { ISurveyCallback } from 'src/survey/common/survey.interface';
import { exportRefundedOrders } from '../services';

export const useExportRefundedOrders = (callback: ISurveyCallback) => {
  return {
    ...useMutation(exportRefundedOrders, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};