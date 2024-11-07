import { useQuery } from 'react-query';
import { IParamsFilter } from '../interfaces';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';
import { getListExternalReferrer } from '../services';

export function useGetListStore(params: IParamsFilter) {
  return {
    ...useQuery(
      [QUERY_KEYS.LIST_EXTERNAL_REFERRER, params],
      () => getListExternalReferrer(params),
      {
        cacheTime: 0,
      }
    ),
  };
}
