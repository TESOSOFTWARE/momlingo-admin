import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsListCategories } from '../common/interface';
import { getListName } from '../common/services';

export function useGetListNameChild(params: IParamsListCategories) {
  return {
    ...useQuery([QUERY_KEYS.LIST_CATEGORY, params], () => getListName(params), {
      cacheTime: 0,
    }),
  };
}
