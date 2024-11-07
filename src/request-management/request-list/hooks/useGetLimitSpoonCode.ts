import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListRequestParams } from '../../../request-management/request-list/list-interface';
import { getLimitSpoonCode } from '../../../request-management/request-list/service';

export function useGetLimitSpoonCode() {
  return {
    ...useQuery([QUERY_KEYS.LIMIT_SPOON_CODE], getLimitSpoonCode, {
      cacheTime: 0,
    }),
  };
}
