import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListTierRankParams, ITierRankForm } from '../../interface';
import { getListTierRank } from '../../services';

export function useGetListTierRank(params: IListTierRankParams) {
  return {
    ...useQuery([QUERY_KEYS.LIST_TIER_RANK, params], () => getListTierRank(params), {
      cacheTime: 0,
    }),
  };
}
