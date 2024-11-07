import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsListHistory } from '../interface';
import { getListGameWinHistory } from '../service';

export const useGetGameWinHistory = (params: IParamsListHistory) => {
  return {
    ...useQuery([QUERY_KEYS.LIST_NEWS, params], () => getListGameWinHistory(params)),
  };
};
