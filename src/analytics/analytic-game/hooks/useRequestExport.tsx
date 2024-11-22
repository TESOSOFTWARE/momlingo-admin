import { useMutation } from 'react-query';
import { ICallback } from '../../interface';
import { requestExportGame } from '../../service';

export const useRequestExport = (callback: ICallback) => {
  return {
    ...useMutation(requestExportGame, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
