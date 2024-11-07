import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IListAgentParams } from '../interface';
import { getAgent } from '../service';

export function useGetAgent(params: IListAgentParams) {
  return {
    ...useQuery([QUERY_KEYS.GET_LIST_AGENT, params], () => getAgent(params)),
  };
}
