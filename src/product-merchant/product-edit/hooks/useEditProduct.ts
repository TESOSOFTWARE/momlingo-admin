import { useQueryClient, useMutation } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IProductCallback } from '../../product-common/interface';
import { editProduct } from '../edit-service';

export const useEditProduct = (callback: IProductCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editProduct, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_PRODUCT]);
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
