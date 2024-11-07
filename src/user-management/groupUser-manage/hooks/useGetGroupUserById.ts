import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getGroupUserById, getListGroupUser } from '../services';
import { IParamsGroupUser } from '../interfaces';

export function useGetGroupUserById(params: number) {
  return {
    ...useQuery(
      [QUERY_KEYS.GROUP_USER_BY_ID, params],
      () => getGroupUserById(params),
      {}
    ),
  };
}
