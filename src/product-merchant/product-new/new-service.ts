import { API_CATEGORY, API_PRODUCT, API_TAG } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import {
  INewProduct,
  IParamsProductCartegory,
  IParamsProductTag,
  IProductCategory,
  IProductTag,
} from './new-interface';

export const newProduct = ({ data }: { data: INewProduct }) =>
  axiosInstance.post(`${API_PRODUCT}`, data);

export const getProductTag = (params: IParamsProductTag) =>
  axiosInstance.get<unknown, IProductTag>(`${API_TAG}`, { params });
export const getProductCategory = (params: IParamsProductCartegory) =>
  axiosInstance.get<unknown, IProductCategory>(`${API_CATEGORY}`, { params });
