import { useInfiniteQuery, useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsGetList, IParamsProductVariant } from '../interfaces';
import { getListGameGift, getProductVariant } from '../services';

export function useGetProductVariant(params: IParamsProductVariant) {
  return useInfiniteQuery(
    [QUERY_KEYS.PRODUCT_VARIANTS, params],
    ({ pageParam = 1 }) => getProductVariant(params, pageParam),
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
