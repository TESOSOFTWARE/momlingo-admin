import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';
import { getShareAppConfig } from '../service';

export const useGetShareAppConfig = () => {
  return {
    ...useQuery([QUERY_KEYS.GET_SHARE_APP_CONFIG], getShareAppConfig),
  };
};
