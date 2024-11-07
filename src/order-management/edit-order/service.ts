import axiosInstance from 'src/common/utils/axios';
import { API_GET_ADDRESS, API_ORDER_MANAGEMENT } from './../../common/constants/apis';
import { IDetailOrder, IEditDataOrder, AddressParams, AddressData } from './interface';
import { useSelector } from 'react-redux';
import { provinceId } from './slice';

// const idProvince = useSelector(provinceId);
// const idProvince = 10;

export const editOrder = (data: IEditDataOrder) =>
  axiosInstance.patch(`${API_ORDER_MANAGEMENT}/status`, data);

export const getOrderById = (id: number) => {
  return axiosInstance.get<unknown, IDetailOrder>(`${API_ORDER_MANAGEMENT}/${id}`);
};

export const getProvince = (params: AddressParams) => {
  if (params.searchText === '') delete params.searchText;
  return axiosInstance.get<unknown, AddressData>(API_GET_ADDRESS, {
    params: params
  });
};

export const getDistrict = (params: AddressParams) => {
  if (params.searchText === '') delete params.searchText;
  return axiosInstance.get<unknown, AddressData>(`${API_GET_ADDRESS}`, {
    params: params
  });
};

export const getWard = (params: AddressParams) => {
  if (params.searchText === '') delete params.searchText;
  return axiosInstance.get<unknown, AddressData>(`${API_GET_ADDRESS}`, {
    params: params
  });
};
