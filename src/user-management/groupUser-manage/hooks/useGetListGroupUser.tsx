import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getListGroupUser } from '../services';
import { IParamsGroupUser } from '../interfaces';

export function useGetListGroupUser(params: IParamsGroupUser) {
  return {
    ...useQuery([QUERY_KEYS.LIST_GROUP_USER, params], () => getListGroupUser(params), {}),
  };
}
