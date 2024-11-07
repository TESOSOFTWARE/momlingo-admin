import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsRequest, IQRCallback } from '../interfaces';
import { getProductGroup } from '../services';

export const useGetListProductGroup = ({
  params,
  callback,
}: {
  params: IParamsRequest;
  callback?: IQRCallback;
}) =>
  useQuery([QUERY_KEYS.LIST_PRODUCT_GROUP, params], () => getProductGroup(params), {
    onSuccess() {
      callback?.onSuccess && callback?.onSuccess();
    },
    onError() {
      callback?.onError && callback?.onError();
    },
  });
