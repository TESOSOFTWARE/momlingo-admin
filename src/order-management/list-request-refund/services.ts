import axiosInstance from '../../common/utils/axios';
import {
  API_ORDER_MANAGEMENT,
  API_REJECT_REFUND,
  API_REQUEST_REFUND,
} from './../../common/constants/apis';
import {
  IParamsRefundedOrderRequest,
  IRequestRefundParams,
  IResRefundedOrderRequest,
} from './interfaces';

export const getListRefundOrderRequest = (params: IParamsRefundedOrderRequest) => {
  return axiosInstance.get<unknown, IResRefundedOrderRequest>(API_ORDER_MANAGEMENT, {
    params,
  });
};

export const requestRefund = (param: { orderId: number; data: IRequestRefundParams }) => {
  return axiosInstance.post(`${API_REQUEST_REFUND}/${param.orderId}`, param.data);
};
export const rejectRefund = (param: { orderId: number; data: IRequestRefundParams }) => {
  return axiosInstance.post(`${API_REJECT_REFUND}/${param.orderId}`, param.data);
};
