import axiosInstance from '../../common/utils/axios';
import { EnumType } from '../common/interface';
import { API_ORDER_MANAGEMENT } from './../../common/constants/apis';
import { IOrderList, IOrderParams } from './interface';

export const getOrder = (params: IOrderParams) =>
  axiosInstance.get<unknown, IOrderList>(`${API_ORDER_MANAGEMENT}`, {
    params: {
      status: params.status,
      startDate: params.startDate,
      endDate: params.endDate,
      phone: params.phone,
      orderId: params.orderId,
      page: params.page,
      limit: params.limit,
      type: EnumType.PHYSICAL,
    },
  });
