import { useMutation } from 'react-query';
import { ICallback } from '../interface';
import { createNews } from '../service';

export const useCreateNews = (callback: ICallback) => {
  return {
    ...useMutation(createNews, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
