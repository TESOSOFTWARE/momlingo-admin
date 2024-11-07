import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getProvinces } from '../service';

export const useGetProvinces = () =>
  useQuery([QUERY_KEYS.GET_PROVINCES], () => getProvinces());
