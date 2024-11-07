import { useInfiniteQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ISearchProductGroup } from '../interface';
import { getListProductGroup } from '../service';

export function useGetListProductGroup(params: ISearchProductGroup) {
  return useInfiniteQuery(
    [QUERY_KEYS.GET_LIST_PRODUCT_GROUP, params],
    ({ pageParam = 1 }) => getListProductGroup(params, pageParam),
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
