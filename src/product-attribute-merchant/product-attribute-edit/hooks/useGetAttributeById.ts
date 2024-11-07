import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getAttributeById } from '../service';

export const useGetAttributeById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.LIST_PRODUCT_ATTRIBUTE_TERM, id], () => getAttributeById(id)),
  };
};
