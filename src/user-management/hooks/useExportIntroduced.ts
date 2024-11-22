import { useMutation } from 'react-query';
import { ICallback } from '../../user-management/interfaces';
import { requestExport } from '../services';

export const useExportIntroduced = (callback: ICallback) => {
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
