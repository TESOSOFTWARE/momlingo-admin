import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IOrderParams } from '../interface';
import { IOrderList } from './../interface';
import { getOrder } from './../service';

export const useGetOrder = (params: IOrderParams) => {
  return {
    ...useQuery([QUERY_KEYS.LIST_ORDER, params], () => getOrder(params), {
      select: (data: IOrderList) => {
        return {
          items: data?.items.map((item) => {
            return {
              id: item.id,
              createAt: item.createdAt,
              expressDeliveryCode: item?.expressDeliveryCode,
              phoneUser: item.user.customer.phoneNumber,
              orderStatus: item.status,
            };
          }),
          meta: data?.meta,
        };
      },
    }),
  };
};
