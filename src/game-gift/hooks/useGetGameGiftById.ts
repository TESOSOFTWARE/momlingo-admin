import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getGameGiftById } from '../services';

export function useGetGameGiftById(id: number) {
  return {
    ...useQuery([QUERY_KEYS.GAME_GIFTS_BY_ID, id], () => getGameGiftById(id), {
      cacheTime: 0,
    }),
  };
}
