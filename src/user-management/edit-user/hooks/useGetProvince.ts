import { useInfiniteQuery, useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IProvinceParams } from '../../interfaces';
import { getProvinceScan } from '../../services';

export const useGetProvince = ( params : IProvinceParams ) =>
useQuery([QUERY_KEYS.GET_LIST_PROVINCE_MERCHANT, params], () => getProvinceScan(params), {
  cacheTime: 0,
});