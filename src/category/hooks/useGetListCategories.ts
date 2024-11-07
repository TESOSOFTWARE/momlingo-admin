import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsListCategories } from '../common/interface';
import { getListCategories } from '../common/services';

export function useGetListCategories(params: IParamsListCategories) {
  return {
    ...useQuery([QUERY_KEYS.LIST_CATEGORY, params], () => getListCategories(params), {
      cacheTime: 0,
    }),
  };
}
