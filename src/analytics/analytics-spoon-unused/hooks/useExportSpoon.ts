import { useMutation } from 'react-query';
import { requestExport } from '../services';
import { ICallback } from '../interfaces';

export const useExportSpoon = (callback: ICallback) => {
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
