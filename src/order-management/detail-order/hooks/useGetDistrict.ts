import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getDistrict } from './../service';

export const useGetDistrict = ({ id }: { id: number }) =>
  useQuery([QUERY_KEYS.GET_DISTRICT, id], () => getDistrict(id), { enabled: false });
