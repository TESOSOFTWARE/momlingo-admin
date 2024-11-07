import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListGameParams, IGameForm } from '../../interface';
import { getTypeGame } from '../../services';

export function useGetTypeGame(params: IListGameParams) {
  return {
    ...useQuery([QUERY_KEYS.TYPE_GAME, params], () => getTypeGame(params), {
      cacheTime: 0,
    }),
  };
}
