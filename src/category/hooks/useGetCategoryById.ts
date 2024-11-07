import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsListCategories } from '../common/interface';
import { getCategoryById, getListCategories } from '../common/services';

export function useGetCategoriesById(id: number) {
  return {
    ...useQuery([QUERY_KEYS.CATEGORY_BY_ID, id], () => getCategoryById(id), {
      cacheTime: 0,
    }),
  };
}
