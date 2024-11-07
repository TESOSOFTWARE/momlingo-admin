import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListUserParams } from '../interfaces';
import { getListUser } from '../services';

export function useGetListUser(params: IListUserParams) {
  return {
    ...useQuery([QUERY_KEYS.LIST_USER, params], () => getListUser(params), {
      cacheTime: 0,
    }),
  };
}
