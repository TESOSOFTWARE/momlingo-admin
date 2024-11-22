import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListHistoryScanParams, IParamsDuplicateScan } from '../interfaces';
import { getListDuplicateScan, getListHistoryScan } from '../services';
export function useGetListDuplicateScan(params: IParamsDuplicateScan) {
  const { data, isLoading, refetch, isRefetching } = useQuery(
    [QUERY_KEYS.GET_LIST_DUPLICATE_SCAN, params],
    () => getListDuplicateScan(params),
    {
      cacheTime: 0,
    }
  );
  return { data, isLoading, refetch, isRefetching };
}
