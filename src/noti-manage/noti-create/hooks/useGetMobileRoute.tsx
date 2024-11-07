import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getMobileRoute } from '../../services';

export function useGetMobileRoute() {
  return {
    ...useQuery([QUERY_KEYS.ROUTE_MOBILE], () => getMobileRoute(), {}),
  };
}
