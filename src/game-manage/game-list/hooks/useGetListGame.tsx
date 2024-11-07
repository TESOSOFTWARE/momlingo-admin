import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListGameParams, IGameForm } from '../../interface';
import { getListGame } from '../../services';

export function useGetListGame(params: IListGameParams) {
  return {
    ...useQuery([QUERY_KEYS.LIST_GAME, params], () => getListGame(params), {
      cacheTime: 0,
    }),
  };
}
