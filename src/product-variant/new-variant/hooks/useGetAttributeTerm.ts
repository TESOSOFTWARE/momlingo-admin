import { useInfiniteQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getAttributeTerm } from '../../common-variant/service';
import { ITermParams } from '../../common-variant/interface';

export const useGetAttributeTerm = (params: ITermParams) => {
  const {
    data: dataAttributeTerm,
    isLoading: isLoadingAttributeTerm,
    fetchNextPage: fetchNextPageAttributeTerm,
    isFetchingNextPage: isFetchingNextPageAttributeTerm,
  } = useInfiniteQuery(
    [QUERY_KEYS.LIST_PRODUCT_ATTRIBUTE_TERM, params],
    ({ pageParam }) => getAttributeTerm({ ...params, page: pageParam }),
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
    dataAttributeTerm,
    isLoadingAttributeTerm,
    fetchNextPageAttributeTerm,
    isFetchingNextPageAttributeTerm,
  };
};
