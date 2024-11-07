import { getProductAttribute } from './../service';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { useQuery } from 'react-query';
export function useGetAttribute() {
  return {
    ...useQuery([QUERY_KEYS.LIST_PRODUCT_ATTRIBUTE], () => getProductAttribute()),
  };
}
