import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getVariantById } from '../service';

export const useGetVariantById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.DETAIL_PRODUCT_VARIANT, id], () => getVariantById(id),{
    }),
   
  };
};
