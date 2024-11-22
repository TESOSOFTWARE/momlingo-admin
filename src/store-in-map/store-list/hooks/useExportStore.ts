import { useMutation } from 'react-query';
import { ICallback } from '../interface';
import { requestExport } from '../services';

export const useExportStore = (callback: ICallback) => {
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
