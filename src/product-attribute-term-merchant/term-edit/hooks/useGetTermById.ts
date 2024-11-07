import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getTermById } from '../service';

export const useGetTermById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.LIST_PRODUCT_ATTRIBUTE_TERM, id], () => getTermById(id)),
  };
};
