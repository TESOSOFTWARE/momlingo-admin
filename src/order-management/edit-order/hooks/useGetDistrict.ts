import { useQuery } from 'react-query';
import { getDistrict } from '../service';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { AddressParams } from '../interface';

export const useGetDistrict = ({ params }: { params: AddressParams }) =>
  useQuery([QUERY_KEYS.GET_DISTRICT_CUSTOMER, params], () => getDistrict(params), {
    cacheTime: 0,
  });
