import { useMutation } from 'react-query';
import { ICallback } from '../interface';
import { requestExportListGameWinHistory } from '../service';

export const useExportListGameWinHistory = (callback: ICallback) => {
  return {
    ...useMutation(requestExportListGameWinHistory, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
