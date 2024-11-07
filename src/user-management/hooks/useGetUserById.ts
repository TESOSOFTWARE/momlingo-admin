import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListUserParams } from '../interfaces';
import { getListUser, getUserById } from '../services';

export function useGetUserById(id: number) {
  return {
    ...useQuery([QUERY_KEYS.USER_BY_ID, id], () => getUserById(id), {
      cacheTime: 0,
    }),
  };
}
