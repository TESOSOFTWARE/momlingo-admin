import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsSystemConfigPoint } from '../common/interfaces';
import { getListSystemConfigPoint } from '../common/services';

export function useGetListSystemConfigPoint(params: IParamsSystemConfigPoint) {
  return {
    ...useQuery([QUERY_KEYS.LIST_POINT, params], () => getListSystemConfigPoint(params)),
  };
}
