import { getProductList } from '../services';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';

export const useGetProductList = () => {
  return useQuery(QUERY_KEYS.GET_PRODUCT_LIST_WHEEL, getProductList);
};
