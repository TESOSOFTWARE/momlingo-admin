import { useInfiniteQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ISearchPoliciesParams } from '../../common/interface';
import { getListPolicies } from '../../common/service';

export function useGetListPolicies(params: ISearchPoliciesParams) {
  return useInfiniteQuery(
    [QUERY_KEYS.GET_LIST_POLICIES, params],
    ({ pageParam = 1 }) => getListPolicies(params, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.meta?.currentPage === lastPage?.meta?.totalPages
          ? undefined
          : lastPage?.meta?.currentPage + 1;
      },
      cacheTime: 0,
    }
  );
}
