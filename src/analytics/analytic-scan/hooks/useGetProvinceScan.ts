import { useQuery } from 'react-query';
import {  getProvinceScan } from '../services';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import {  IProvinceParams } from '../interfaces';

export const useGetProvinceScan = ( params : IProvinceParams ) =>
  useQuery([QUERY_KEYS.GET_LIST_PROVINCE, params], () => getProvinceScan(params), {
    cacheTime: 0,
  });
