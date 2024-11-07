import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListRequestParams } from '../../request-list/list-interface';
import { getListHistoryDownload } from '../service';

export function useGetListHistoryDownload(params: IListRequestParams) {
  return {
    ...useQuery(
      [QUERY_KEYS.DOWNLOAD_HISTORY_LIST, params],
      () => getListHistoryDownload(params),
      { cacheTime: 0 }
    ),
  };
}
