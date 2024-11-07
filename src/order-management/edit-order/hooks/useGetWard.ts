import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { AddressParams } from '../interface';
import { getWard } from '../service';

export const useGetWard = ({ params }: { params: AddressParams }) =>
  useQuery([QUERY_KEYS.GET_WARD_CUSTOMER, params], () => getWard(params), {
    cacheTime: 0,
  });
