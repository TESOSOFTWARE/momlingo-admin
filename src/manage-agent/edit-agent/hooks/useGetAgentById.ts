import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getAgentById } from '../service';

export const useGetAgentById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.DETAIL_AGENT, id], () => getAgentById(id)),
  };
};
