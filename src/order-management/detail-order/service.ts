import {
  API_DISTRICT,
  API_SHOP,
  API_SERVICES,
  API_REFUND_ORDER,
  API_REFUND_POINT,
} from './../../common/constants/apis';
import {
  API_ORDER_DELIVERY,
  API_ORDER_MANAGEMENT,
  API_PROVINCES,
} from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import {
  IAvailableService,
  IDataRefundPoint,
  IDetailOrder,
  IDistrictShop,
  IListDistrict,
  IListProvinces,
  IOrderDelivery,
} from './interface';

export const getOrderById = (id: number) => {
  return axiosInstance.get<unknown, IDetailOrder>(`${API_ORDER_MANAGEMENT}/${id}`);
};

export const postOrderDelivery = ({ data, id }: { data: IOrderDelivery; id: number }) =>
  axiosInstance.post(`${API_ORDER_DELIVERY}/${id}`, data);

export const refundCoin = (data: IDataRefundPoint) =>
  axiosInstance.post(`${API_REFUND_POINT}/${data?.id}`, data?.data);

export const getProvinces = () => {
  return axiosInstance.get<unknown, IListProvinces>(`${API_PROVINCES}`);
};

export const getDistrict = (id: number) => {
  return axiosInstance.get<unknown, IListDistrict>(`${API_DISTRICT}/${id}`);
};

export const getShop = () => {
  return axiosInstance.get<unknown, IDistrictShop>(`${API_SHOP}`);
};

export const getAvailableService = (toDistrict: number, fromDistrict: number) => {
  return axiosInstance.get<unknown, IAvailableService>(
    `${API_SERVICES}/${toDistrict}/${fromDistrict}`
  );
};
