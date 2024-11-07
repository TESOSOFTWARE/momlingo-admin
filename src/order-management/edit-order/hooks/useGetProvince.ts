import { useQuery } from 'react-query';
import { getDistrict, getProvince } from '../service';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { AddressParams } from '../interface';

export const useGetProvince = ({ params }: { params: AddressParams }) =>
  useQuery([QUERY_KEYS.GET_LIST_PROVINCE, params], () => getProvince(params), {
    cacheTime: 0,
  });
