import { useMutation } from 'react-query';
import { ICallback } from '../../interface';
import { requestExportOrders } from '../../service';

export const useRequestExport = (callback: ICallback) => {
  return {
    ...useMutation(requestExportOrders, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
