import { useMutation } from "react-query";
import { ICallback } from "../../interface";
import { requestExportPoint } from "../services";

export const useRequestExport = (callback: ICallback) => {
    return {
      ...useMutation(requestExportPoint, {
        onSuccess: () => {
          callback.onSuccess && callback.onSuccess();
        },
        onError: () => {
          callback.onError && callback.onError();
        },
      }),
    };
  };
  