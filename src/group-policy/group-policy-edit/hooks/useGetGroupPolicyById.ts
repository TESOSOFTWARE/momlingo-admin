import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getGroupPolicyById } from '../../common/service';

export const useGetGroupPolicyById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.GIFT_DETAIL, id], () => getGroupPolicyById(id)),
  };
};
