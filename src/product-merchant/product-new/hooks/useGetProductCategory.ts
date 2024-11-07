import { useInfiniteQuery } from 'react-query';
import { getProductCategory } from '../new-service';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IParamsProductCartegory } from '../new-interface';

export const useGetProductCategory = (params: IParamsProductCartegory) => {
  const {
    data: dataProductCategory,
    isLoading: isLoadingProductCategory,
    fetchNextPage: fetchNextPageProductCategory,
    isFetchingNextPage: isFetchingNextPageProductCategory,
  } = useInfiniteQuery(
    [QUERY_KEYS.LIST_PRODUCT_CATEGORY, params],
    ({ pageParam }) => getProductCategory({ ...params, page: pageParam }),
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
    dataProductCategory,
    isLoadingProductCategory,
    fetchNextPageProductCategory,
    isFetchingNextPageProductCategory,
  };
};
