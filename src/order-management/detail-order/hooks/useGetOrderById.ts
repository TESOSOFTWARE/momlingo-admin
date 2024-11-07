import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback } from '../../common/interface';
import { getOrderById } from '../service';

export const useGetOrderById = ({ id, callback }: { id: number; callback: ICallback }) =>
  useQuery([QUERY_KEYS.GET_ORDER_BY_ID, id], () => getOrderById(id));
