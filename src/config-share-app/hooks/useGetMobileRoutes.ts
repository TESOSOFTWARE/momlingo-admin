import { useQuery } from 'react-query';
import { getMobileRoutes } from '../service';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';

export const useGetMobileRoutes = () => {
  return { ...useQuery(QUERY_KEYS.GET_MOBILE_ROUTE, getMobileRoutes) };
};
