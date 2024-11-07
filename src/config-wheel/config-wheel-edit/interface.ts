import { Message, MultipleFieldErrors, Ref } from 'react-hook-form';

export interface IInitialState {
  fields: IFields[];
  isOpenWheelImageModal: boolean;
  giftList: IGiftItem[];
  status: string | undefined;
}
export interface IFields {
  id?: any;
  giftCode: number;
  eventName: string;
  amount: number;
  winRate: number;
  giftId?: number | null;
  ordinal: number;
}
export type FieldError = {
  type: string;
  ref?: Ref;
  types?: MultipleFieldErrors;
  message?: Message;
};
export interface IEditForm {
  wheelName: string;
  startDateWheel: FieldError;
  endDateWheel: FieldError;
}
interface IGiftItem {
  label: string;
  value: number;
}
export interface IFormEditWheel {
  editWheelName: string;
  editStartDateWheel: Date;
  editEndDateWheel: Date;
}
export interface IResWheelDetail {
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  version: number;
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  imageId: number;
  merchantId: number;
  image: {
    createdAt: string;
    deletedAt: null | number;
    version: number;
    id: number;
    key: string;
    url: string;
    type: string;
    size: number;
    uploaderId: number;
  };
  eventGifts: IEventGiftItem[];
}
export interface IEventGiftItem {
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  version: number;
  id: number;
  winRate: number;
  amount: number;
  ordinal: number;
  eventId: number;
  giftId: number;
  gift: {
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
    version: number;
    id: number;
    name: string;
    price: string;
    thumbnailId: number;
    merchantId: number;
  };
}
export interface IRequestForEditingWheel {
  id: number | undefined;
  endDate: string;
  startDate: string;
  status: string | undefined;
  name: string;
  imageId: number | undefined;
  eventGiftDtos: {
    id: number | null | undefined;
    winRate: number;
    amount: number;
    ordinal: number;
    giftId: number;
  }[];
}
