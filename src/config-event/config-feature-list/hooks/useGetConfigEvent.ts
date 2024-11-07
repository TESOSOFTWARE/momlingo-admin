import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IConfigEventList } from '../config-event-interface';
import { getConfigEvent } from '../config-event-service';

export function useGetConfigEvent() {
  return {
    ...useQuery([QUERY_KEYS.LIST_CONFIG_EVENT], () => getConfigEvent(), {
      select: (data) => data.eventConfig,
    }),
  };
}
