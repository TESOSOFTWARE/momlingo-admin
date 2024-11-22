import { IParamsEvent } from '../common/interfaces';
import { getListEvent } from '../common/services';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export function useGetListEvent(params: IParamsEvent) {
  return {
    ...useQuery([QUERY_KEYS.LIST_EVENT, params], () => getListEvent(params), {
      cacheTime: 0,
    }),
  };
}
