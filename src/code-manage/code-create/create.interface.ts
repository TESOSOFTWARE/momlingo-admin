import { PaginationParams } from '../../common/constants/common.interfaces';

export type GetEventParams = PaginationParams;

export interface Event {
  id: number;
  name: string;
}

export interface GetEventRes {
  items: Event[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
export interface BaseEventId {
  value: number;
  label: string;
}

export interface PostCreateCode {
  amount: number;
  eventId: number;
  useTime: number;
  expiresAt: string;
}

export interface OnSubmitValuePost {
  amount: number;
  eventId: BaseEventId;
  useTime: number;
  expiresAt: string;
}
