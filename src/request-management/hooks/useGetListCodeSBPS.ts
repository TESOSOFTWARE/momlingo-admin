import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsRequest, IQRCallback } from '../interfaces';
import { getSBPSCode } from '../services';

export const useGetListSBPSCode = ({
  params,
  callback,
}: {
  params: IParamsRequest;
  callback?: IQRCallback;
}) =>
  useQuery([QUERY_KEYS.LIST_CODE_SBPS, params], () => getSBPSCode(params), {
    onSuccess() {
      callback?.onSuccess && callback?.onSuccess();
    },
    onError() {
      callback?.onError && callback?.onError();
    },
  });
