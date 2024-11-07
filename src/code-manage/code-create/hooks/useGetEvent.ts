import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { GetEventParams } from '../create.interface';
import { getEvent } from '../../code-create/create.service';

export function useGetEvent(params: GetEventParams) {
  return {
    ...useQuery([QUERY_KEYS.LIST_EVENT, params], () => getEvent(params), {
      keepPreviousData: true,
    }),
  };
}
