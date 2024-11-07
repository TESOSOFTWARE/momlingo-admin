import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getNotificationsById } from '../../services';

export const useGetNotificationById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.NOTIFICATION_BY_ID, id], () => getNotificationsById(id), {
      select: (data) => data,
    }),
  };
};
