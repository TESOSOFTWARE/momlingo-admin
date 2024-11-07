import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsListHistory } from '../interface';
import { getListWinningHistory } from '../service';

export function useGetListHistoryWinning(params: IParamsListHistory) {
  return {
    ...useQuery([QUERY_KEYS.HISTORY_WINNING, params], () =>
      getListWinningHistory(params)
    ),
  };
}
