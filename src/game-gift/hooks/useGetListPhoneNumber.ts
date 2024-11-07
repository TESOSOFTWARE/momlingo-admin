import { useInfiniteQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsListUser } from '../interfaces';
import { getListPhoneNumber } from '../services';

export function useGetListPhoneNumber(params: IParamsListUser) {
  return useInfiniteQuery(
    [QUERY_KEYS.LIST_USER, params],
    ({ pageParam = 1 }) => getListPhoneNumber(params, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.meta?.currentPage === lastPage?.meta?.totalPages
          ? undefined
          : lastPage?.meta?.currentPage + 1;
      },
      cacheTime: 0,
      onError: (error) => {
        console.error('Error fetching list phone numbers:', error);
      }
    }
  );
}
