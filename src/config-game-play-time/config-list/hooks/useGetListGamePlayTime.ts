import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsSearch } from '../../common/interface';
import { getListGamePlayTimeConfig } from '../../common/service';

export function useGetListGamePlaytime(params: IParamsSearch) {
  return {
    ...useQuery(
      [QUERY_KEYS.LIST_GAME_CONFIG_PLAYTIME, params],
      () => getListGamePlayTimeConfig(params),
    ),
  };
}
