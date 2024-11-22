import { useMutation } from 'react-query';
import { ICallback } from '../../user-management/interfaces';
import { requestExport, requestExportDetail } from '../services';

export const useExportDetailExternal = (callback: ICallback) => {
  return {
    ...useMutation(requestExportDetail, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
