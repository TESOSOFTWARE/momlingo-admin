import { getStoreById } from './../services';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { useQuery } from 'react-query';

export const useGetStoreById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.STORE_IN_MAP_DETAIL, id], () => getStoreById(id)),
  };
};
