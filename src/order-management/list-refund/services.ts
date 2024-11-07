import axiosInstance from '../../common/utils/axios';
import {
  API_EXPORT_REFUND_ORDER,
  API_ORDER_MANAGEMENT,
  API_REFUND_ORDER,
} from './../../common/constants/apis';
import {
  IParamsExportRefundedOrders,
  IParamsRefundedOrder,
  IResRefundedOrder,
} from './interfaces';

export const getListRefundOrder = (params: IParamsRefundedOrder) => {
  return axiosInstance.get<unknown, IResRefundedOrder>(API_REFUND_ORDER, { params });
};

export const getRefundOrderById = (id: number) => {
  return axiosInstance.get<unknown, IResRefundedOrder>(`${API_REFUND_ORDER}/${id}`);
};

export const exportRefundedOrders = (params: IParamsExportRefundedOrders) => {
  return axiosInstance.get(API_EXPORT_REFUND_ORDER, { params });
};
