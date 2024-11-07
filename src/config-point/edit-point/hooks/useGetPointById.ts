import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback } from '../../common/interface';
import { getPointById } from '../service';

export const useGetPointById = ({ id, callback }: { id: number; callback: ICallback }) =>
  useQuery([QUERY_KEYS.GET_PRODUCT_BY_ID, id], () => getPointById(id));
