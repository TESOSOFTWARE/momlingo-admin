import { useMutation } from 'react-query';
import { ICallback } from '../interfaces';
import { exportListHistoryScan } from '../services';

export const useExportListHistoryScan = (callback: ICallback) => {
  return {
    ...useMutation(exportListHistoryScan, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
