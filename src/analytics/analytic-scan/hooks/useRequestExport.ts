import { useMutation } from 'react-query';
import { ICallback } from '../interfaces';
import { requestExportScan } from '../services';

export const useRequestExport = (callback: ICallback) => {
  return {
    ...useMutation(requestExportScan, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
