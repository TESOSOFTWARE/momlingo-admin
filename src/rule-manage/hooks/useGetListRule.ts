import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getListRule } from '../services';

export function useGetListRule() {
  return {
    ...useQuery([QUERY_KEYS.RULE_CONFIG], () => getListRule(), {
      cacheTime: 0,
    }),
  };
}
