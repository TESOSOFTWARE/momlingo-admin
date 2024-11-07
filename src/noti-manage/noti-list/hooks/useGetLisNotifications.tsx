import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParams } from '../../interface';
import { getListNotifications } from '../../services';

export function useGetListNotifications(params: IParams) {
  return {
    ...useQuery(
      [QUERY_KEYS.LIST_NOTIFICATIONS, params],
      () => getListNotifications(params),
      {
        cacheTime: 0,
      }
    ),
  };
}
