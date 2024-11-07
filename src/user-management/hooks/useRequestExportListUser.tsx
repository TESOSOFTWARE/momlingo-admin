import { useMutation } from 'react-query';
import { ICallback } from '../interfaces';
import { requestExportListUser } from '../services';

export const useRequestExportListUser = (callback: ICallback) => {
  return {
    ...useMutation(requestExportListUser, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
