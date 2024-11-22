import { useMutation } from 'react-query';
import { IFeedbackCallback } from '../../interface';
import { requestExport } from '../../services';

export const useRequestExport = (callback: IFeedbackCallback) => {
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
