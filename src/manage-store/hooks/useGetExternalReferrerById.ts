import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';
import { getExternalReferrerByID, getExternalReferrerHistory } from '../services';
import { IExternalHistoryParams } from '../interfaces';

export const useGetExternalReferrerById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.DETAIL_EXTERNAL_REFERRER, id], () =>
      getExternalReferrerByID(id)
    ),
  };
};

export function useGetExternalRefHistory(params: IExternalHistoryParams) {
  return {
    ...useQuery(
      [QUERY_KEYS.GET_EXTERNAL_REF_HISTORY, params],
      () => getExternalReferrerHistory(params),
      {
        cacheTime: 0,
      }
    ),
  };
}
