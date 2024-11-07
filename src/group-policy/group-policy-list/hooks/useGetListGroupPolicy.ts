import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { ISearchParams } from '../../common/interface';
import { getListGroupPolicy } from '../../common/service';

export function useGetListGroupPolicy(params: ISearchParams) {
  return {
    ...useQuery(
      [QUERY_KEYS.LIST_GROUP_POLICY, params],
      () => getListGroupPolicy(params),
      {
        cacheTime: 0,
      }
    ),
  };
}
