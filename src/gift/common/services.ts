import { API_MERCHANT_GIFT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IFormCreateGift, IGetListParams, IResListGift } from './interface';

export const getListGift = (params: IGetListParams) => {
  return axiosInstance.get<unknown, IResListGift>(API_MERCHANT_GIFT, { params });
};

export const deleteSingleGift = (id: number) => {
  return axiosInstance.delete(`${API_MERCHANT_GIFT}/${id}`);
};

export const createGift = (data: IFormCreateGift) => {
  return axiosInstance.post(API_MERCHANT_GIFT, data);
};
