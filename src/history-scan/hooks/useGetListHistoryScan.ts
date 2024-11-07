import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListHistoryScanParams } from '../interfaces';
import { getListHistoryScan } from '../services';
;

export function useGetListHistoryScan(params: IListHistoryScanParams) {
  return {
    ...useQuery([QUERY_KEYS.LIST_HISTORY_SCAN, params], () => getListHistoryScan(params), {
      cacheTime: 0,
    }),
  };
}
