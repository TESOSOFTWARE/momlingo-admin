import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';
import { getProductById } from '../services';

export const useGetProductById = ({ id }: { id: number }) =>
  useQuery([QUERY_KEYS.GAME_GIFTS_BY_ID, id], () => getProductById(id), {
    cacheTime: 0,
  });
