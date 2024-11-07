import { useMutation } from 'react-query';
import { ICallback } from '../interfaces';
import { exportListDuplicateCode } from '../services';

export const useExportDuplicateCode = (callback: ICallback) => {
  return {
    ...useMutation(exportListDuplicateCode, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
