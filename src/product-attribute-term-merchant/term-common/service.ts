import { API_PRODUCT_ATTRIBUTE_MERCHANT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IAttributeProduct } from '../../product-merchant/product-common/interface';
import { IAttributeParams } from './interface';

export const getAttribute = (params: IAttributeParams) => {
  return axiosInstance.get<unknown, IAttributeProduct>(
    `${API_PRODUCT_ATTRIBUTE_MERCHANT}`,
    {
      params,
    }
  );
};
