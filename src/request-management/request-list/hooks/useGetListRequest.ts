import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListRequestParams } from '../../../request-management/request-list/list-interface';
import { getListRequest } from '../../../request-management/request-list/service';

export function useGetListRequest(params: IListRequestParams) {
  return {
    ...useQuery([QUERY_KEYS.REQUEST_LIST, params], () => getListRequest(params), {
      cacheTime: 0,
    }),
  };
}
