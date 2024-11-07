import { getPoint } from './../service';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IPointParams } from '../interface';

export function useGetPoint(params: IPointParams) {
  return {
    ...useQuery([QUERY_KEYS.LIST_POINT, params], () => getPoint(params)),
  };
}
