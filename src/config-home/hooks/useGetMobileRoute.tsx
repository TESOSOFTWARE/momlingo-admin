import { useQuery } from 'react-query';
import { getMobileRoute } from '../services';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';

export const useGetMobileRoute = () => {
  return useQuery(QUERY_KEYS.GET_MOBILE_ROUTE, getMobileRoute);
};
