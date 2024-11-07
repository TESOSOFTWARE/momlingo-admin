import { useInfiniteQuery } from 'react-query';
import { getProductTag } from '../new-service';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IParamsProductTag } from '../new-interface';

export const useGetProductTag = (params: IParamsProductTag) => {
  const {
    data: dataProductTag,
    isLoading: isLoadingProductTag,
    fetchNextPage: fetchNextPageProductTag,
    isFetchingNextPage: isFetchingNextPageProductTag,
  } = useInfiniteQuery(
    [QUERY_KEYS.LIST_PRODUCT_TAG, params],
    ({ pageParam }) => getProductTag({ ...params, page: pageParam }),
    {
      getNextPageParam: (lastPage: any) => {
        const { meta } = lastPage;
        const { currentPage, totalPages } = meta;
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
      cacheTime: 60000,
    }
  );

  return {
    dataProductTag,
    isLoadingProductTag,
    fetchNextPageProductTag,
    isFetchingNextPageProductTag,
  };
};
