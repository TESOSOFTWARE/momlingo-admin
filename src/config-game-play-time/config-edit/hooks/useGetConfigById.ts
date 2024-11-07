import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getGamePlayTimeConfigById } from '../../common/service';

export function useGetGamePlayTimeConfigById(id: number) {
  return {
    ...useQuery(
      [QUERY_KEYS.LIST_GAME_CONFIG_PLAYTIME, id],
      () => getGamePlayTimeConfigById(id),
    ),
  };
}
