import { getProductAttributeTerm } from './../service';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { useQuery } from 'react-query';
export function useGetAttributeTerm() {
  return {
    ...useQuery([QUERY_KEYS.LIST_PRODUCT_ATTRIBUTE_TERM], () =>
      getProductAttributeTerm()
    ),
  };
}
