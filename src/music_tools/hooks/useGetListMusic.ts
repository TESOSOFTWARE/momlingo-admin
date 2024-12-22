import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsListCategories } from '../common/interface';
import { getListMusic } from '../common/services';

export function useGetListMusic(params: IParamsListCategories) {
  return {
    ...useQuery([QUERY_KEYS.LIST_MUSIC, params], () => getListMusic(params), {
      cacheTime: 0,
    }),
  };
}
