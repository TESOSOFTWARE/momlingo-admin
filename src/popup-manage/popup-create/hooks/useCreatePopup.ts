import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getRelatedCacheKeys } from '../../../common/utils/getRelatedCacheKeys';
import { IPopupCallback } from '../../interface';
import { createPopup } from '../../services';

export const useCreatePopup = (callback: IPopupCallback) => {
  return {
    ...useMutation(createPopup, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
