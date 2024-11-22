import axiosInstance from '../common/utils/axios';
import {
  API_GAME_GIFTS,
  API_GET_LIST_USER,
  API_PRODUCT,
  API_VARIANT,
} from '../common/constants/apis';
import {
  IFormCreateGameGift,
  IFormDataGameGift,
  IFormEditGameGift,
  IParamsDeleteGameGift,
  IParamsGetList,
  IParamsProductVariant,
  IParamsProductVirtual,
  IProductVariant,
  IResGameGiftById,
  IResListGameGifts,
  IResProductById,
  IResProductVariant,
  IResProductVirtual,
} from './interfaces';
import { IResListUser } from '../user-management/interfaces';

export const getListGameGift = (params: IParamsGetList) => {
  return axiosInstance.get<unknown, IResListGameGifts>(API_GAME_GIFTS, { params });
};

export const deleteGameGift = (params: IParamsDeleteGameGift) => {
  return axiosInstance.delete(`${API_GAME_GIFTS}/multiple`, { data: params });
};

export const getGameGiftById = (id: number) => {
  return axiosInstance.get<unknown, IResGameGiftById>(`${API_GAME_GIFTS}/${id}`);
};
export const createGameGift = (data: IFormDataGameGift) => {
  return axiosInstance.post(API_GAME_GIFTS, data);
};

export const editGameGift = (data: IFormDataGameGift) => {
  return axiosInstance.put(API_GAME_GIFTS, data);
};

export const getProductVariant = (params: IParamsProductVariant, pageParams: number) => {
  params.page = pageParams;
  return axiosInstance.get<unknown, IResProductVariant>(API_VARIANT, { params });
};

export const getProductVirtual = (params: IParamsProductVirtual, pageParams: number) => {
  params.page = pageParams;
  return axiosInstance.get<unknown, IResProductVirtual>(API_PRODUCT, { params });
};

export const getProductById = (id: number) => {
  return axiosInstance.get<unknown, IResProductById>(`${API_PRODUCT}/${id}`);
};

export const getListPhoneNumber = (params: IParamsProductVirtual, pageParams: number) => {
  params.page = pageParams;
  return axiosInstance.get<unknown, IResListUser>(API_GET_LIST_USER, { params });
};
