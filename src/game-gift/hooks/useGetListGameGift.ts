import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsGetList } from '../interfaces';
import { getListGameGift } from '../services';

export function useGetListGameGift(params: IParamsGetList) {
  return {
    ...useQuery([QUERY_KEYS.GAME_GIFTS, params], () => getListGameGift(params), {
      cacheTime: 0,
    }),
  };
}
