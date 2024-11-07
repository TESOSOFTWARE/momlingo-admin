import { useQuery } from 'react-query';
import { getHomeConfigData } from '../services';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';

export const useGetHomeConfigData = () => {
  return useQuery([QUERY_KEYS.GET_HOME_CONFIG_DATA], getHomeConfigData);
};
