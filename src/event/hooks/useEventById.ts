import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getEventById } from '../common/services';

export function useGetEventById(id: number) {
  return {
    ...useQuery([QUERY_KEYS.EVENT_BY_ID, id], () => getEventById(id), {
      cacheTime: 0,
    }),
  };
}
