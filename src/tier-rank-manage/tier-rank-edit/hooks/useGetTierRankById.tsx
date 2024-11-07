import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getTierRankById } from '../../services';

export const useGetTierRankById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.DETAIL_TIER_RANK, id], () => getTierRankById(id), {
      select: (data) => data,
    }),
  };
};
