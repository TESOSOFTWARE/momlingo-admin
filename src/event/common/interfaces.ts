import {
  PaginationParams,
  BaseResponse,
  ImageResponse,
} from 'src/common/constants/common.interfaces';
import { IPoint } from '../../config-point/list-point/interface';

export interface ICallback {
  onSuccess?: VoidFunction;
  onError?: VoidFunction;
}

export interface IResListEvent {
  items: IEvent[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IEvent {
  id: number;
  type: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  eventSkus: IEventSkus[];
  merchantId: number;
  image: ImageResponse;
  eventReward: IEventReward;
}

export interface IEventReward {
  id?: number;
  type: string;
  value: number;
  event?: any;
}

export interface IEventSkus {
  id: number;
  event?: any;
  systemConfigPoint?: ISystemConfigPoint;
}
export interface ISystemConfigPoint {
  id: number;
  code?: string;
  point?: number;
  type?: string;
  description?: string;
  isActive?: boolean;
  productGroup?: string;
  weight?: number;
  eventSkus?: any;
}

export interface TableRowProps {
  row: IEvent;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
}

export interface IParamsEvent {
  page?: number;
  limit?: number;
  searchText?: string;
}

export interface IDeleteEvent {
  ids: number[];
}

export interface IParamsSystemConfigPoint {
  page?: number;
  limit?: number;
  isActive?: boolean;
  type?: boolean;
}

export interface IFormCreateEvent {
  type: string;
  name: string;
  status: string;
  startDate: string | null;
  endDate: string | null;
  systemConfigPointIds: ISystemConfigPoint[];
  eventReward: IEventReward;
}

export interface IFormDataEvent {
  id?: number;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  eventReward: IEventReward;
  status: string;
  systemConfigPointIds: number[];
}
