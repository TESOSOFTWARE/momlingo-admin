import { API_PRODUCT_ATTRIBUTE_MERCHANT } from 'src/common/constants/apis';
import { API_CATEGORY, API_TAG } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IListVariantParams } from '../../product-variant/new-variant/interface';
import {
  IAttributeProduct,
  IProductCategory,
  IProductTag,
} from '../product-common/interface';
import {
  API_PRODUCT_ATTRIBUTE_TERM_MERCHANT,
  API_VARIANT,
} from './../../common/constants/apis';
import { IVariantList } from './components/VariantTable/interface';
import { IAttributeTermProduct } from './interface';

export const getProductTag = () => axiosInstance.get<unknown, IProductTag>(`${API_TAG}`);
export const getProductCategory = () =>
  axiosInstance.get<unknown, IProductCategory>(`${API_CATEGORY}`);
export const getProductAttribute = () =>
  axiosInstance.get<unknown, IAttributeProduct>(`${API_PRODUCT_ATTRIBUTE_MERCHANT}`);
export const getProductAttributeTerm = () =>
  axiosInstance.get<unknown, IAttributeTermProduct>(
    `${API_PRODUCT_ATTRIBUTE_TERM_MERCHANT}`
  );
export const getVariant = (params: IListVariantParams) =>
  axiosInstance.get<unknown, IVariantList>(`${API_VARIANT}`, { params });
