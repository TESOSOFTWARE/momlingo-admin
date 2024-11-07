import { useInfiniteQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getAttribute } from '../service';
import { IAttributeParams } from '../interface';

export const useGetAttribute = (params: IAttributeParams) => {
  const {
    data: dataAttribute,
    isLoading: isLoadingAttribute,
    fetchNextPage: fetchNextPageAttribute,
    isFetchingNextPage: isFetchingNextPageAttribute,
  } = useInfiniteQuery(
    [QUERY_KEYS.LIST_PRODUCT_ATTRIBUTE, params],
    ({ pageParam }) => getAttribute({ ...params, page: pageParam }),
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
    dataAttribute,
    isLoadingAttribute,
    fetchNextPageAttribute,
    isFetchingNextPageAttribute,
  };
};
