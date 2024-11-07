import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getDetailWheel } from '../services';

export const useGetWheelDetail = (id: string | undefined) => {
  return useQuery([QUERY_KEYS.GET_WHEEL_DETAIL, id], () => getDetailWheel(id));
};
