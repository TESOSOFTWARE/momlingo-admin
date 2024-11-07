import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getProductCategory } from '../service';

export function useGetCategory() {
  return {
    ...useQuery([QUERY_KEYS.CATEGORY_PRODUCT], () => getProductCategory()),
  };
}
