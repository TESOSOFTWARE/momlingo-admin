import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getListChildTracker, getListRule } from '../services';

export function useGetListChildTracker() {
  return {
    ...useQuery([QUERY_KEYS.LIST_CHILD_TRACKERS], () => getListChildTracker(), {
      cacheTime: 0,
    }),
  };
}
