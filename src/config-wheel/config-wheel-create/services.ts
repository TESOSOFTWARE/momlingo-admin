import axiosInstance from '../../common/utils/axios';
import { API_WHEEL, API_GIFT, API_PRODUCT } from '../../common/constants/apis';
import { IDataForCreatingWheel } from './interface';

export const createNewEvent = (data: IDataForCreatingWheel) => {
  return axiosInstance.post(API_WHEEL, data);
};
export const getGiftList = (page: number) => {
  return axiosInstance.get(API_GIFT, {
    params: {
      page,
    },
  });
};

export const getProductList = () => {
  return axiosInstance.get(API_PRODUCT, { params: { page: 1 } });
};
