import { useInfiniteQuery, useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsGetList, IParamsProductVariant, IParamsProductVirtual, IResProductVirtual } from '../interfaces';
import { getListGameGift, getProductVariant, getProductVirtual } from '../services';

export function useGetProductVirtual(params: IParamsProductVirtual) {
  return useInfiniteQuery(
    [QUERY_KEYS.GET_PRODUCT_VIRTUAL, params],
    ({ pageParam = 1 }) => getProductVirtual(params, pageParam),
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
