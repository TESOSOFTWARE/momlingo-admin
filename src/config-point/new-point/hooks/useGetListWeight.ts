import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsRequest, IQRCallback } from '../interface';
import { getWeightSpoon } from '../service';

export const useGetListWeight = ({
  params,
  callback,
}: {
  params: IParamsRequest;
  callback?: IQRCallback;
}) =>
  useQuery([QUERY_KEYS.LIST_WEIGHT, params], () => getWeightSpoon(params), {
    onSuccess() {
      callback?.onSuccess && callback?.onSuccess();
    },
    onError() {
      callback?.onError && callback?.onError();
    },
  });