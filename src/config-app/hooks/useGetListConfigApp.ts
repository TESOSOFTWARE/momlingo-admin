import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getListConfigApp } from '../services';

export function useGetListConfigApp(params?: any) {
  return {
    ...useQuery([QUERY_KEYS.LIST_APP_CONFIG, params], () => getListConfigApp(params), {
      cacheTime: 0,
    }),
  };
}
