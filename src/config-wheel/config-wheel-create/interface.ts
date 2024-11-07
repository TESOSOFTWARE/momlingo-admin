import { Message, MultipleFieldErrors, Ref } from 'react-hook-form';
// import { Dayjs } from 'dayjs';

export interface IInitialState {
  productList: IGiftItem[];
  status: string;
  fields: IConfigWheelInfoValue[];
  isOpenModalPreviewWheel: boolean;
  productVariant: {
    label: string;
    value: string;
  }[];
}
export interface IFormCreateNewWheel {
  configWheel: IConfigWheelInfoValue[];
  wheelName: string;
  startDateWheel: Date;
  endDateWheel: Date;
}
export interface IConfigWheelInfoValue {
  id?: string;
  giftCode: string;
  productId: number;
  amount: number;
  winRate: number;
  ordinal: number;
  giftId?: number | null;
  productToVariantId: number;
  type: string;
  productVariantId: number;
}
export type FieldError = {
  type: string;
  ref?: Ref;
  types?: MultipleFieldErrors;
  message?: Message;
};
export interface IErrorsForm {
  wheelName: FieldError;
  startDateWheel: FieldError;
  endDateWheel: FieldError;
}
export interface IRows {
  id: string;
  eventName: string;
  giftCode: number;
  winRate: number;
  amount: number;
}
interface IGiftItem {
  label: string;
  value: number;
}
export interface IGiftListResponse {
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  version: number;
  id: number;
  name: string;
  price: string;
  thumbnailId: number;
  merchantId: number;
  merchant: {
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    version: number;
    id: number;
    name: string;
    email: string;
    status: string;
    rank: string;
    address: string;
    phoneNumber: string;
    userId: number;
    avatarId: number;
  };
}
export interface IDataForCreatingWheel {
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  imageId: number;
  eventGiftDtos: {
    winRate: number;
    amount: number;
    ordinal: number;
    productId: number;
    productToVariantId: number;
  }[];
}
export enum ProductType {
  SIMPLE = 'SIMPLE',
  CONFIGURABLE = 'CONFIGURABLE',
  GROUPED = 'GROUPED',
  BUNDLE = 'BUNDLE',
  VIRTUAL = 'VIRTUAL',
}
