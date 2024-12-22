import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsListCategories } from '../common/interface';
import { getNameById } from '../common/services';

export function useGetNameById(id: number) {
  return {
    ...useQuery([QUERY_KEYS.CATEGORY_BY_ID, id], () => getNameById(id), {
      cacheTime: 0,
    }),
  };
}
