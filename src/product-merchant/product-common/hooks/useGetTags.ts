import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getProductTag } from '../service';

export function useGetTag() {
  return {
    ...useQuery([QUERY_KEYS.TAG_PRODUCT], () => getProductTag()),
  };
}
