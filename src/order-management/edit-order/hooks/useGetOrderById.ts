import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback } from '../../common/interface';
import { IDetailOrder } from '../interface';
import { getOrderById } from '../service';

export const useGetOrderById = ({ id, callback }: { id: number; callback: ICallback }) =>
  useQuery([QUERY_KEYS.GET_ORDER_BY_ID, id], () => getOrderById(id), {
    select: (data: IDetailOrder) => {
      return {
        orderId: data.id,
        createAt: data.createdAt,
        name: data.orderShipping.name,
        phone: data.orderShipping.phone,
        status: data.status,
        province: data.orderShipping.province,
        ward: data.orderShipping.ward,
        district: data.orderShipping.district,
        type: data.type,
        address1: data.orderShipping.address1
      };
    }
  });
