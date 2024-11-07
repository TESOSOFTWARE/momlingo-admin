import { IOrder } from '../list-physical/interface';

export interface IPropsTableRow {
  row: IRefundedOrder;
}

export interface IRefundedOrder {
  id: number;
  phoneNumber: string;
  createdAtOrder: string;
  refundPoint: number;
  refundDate: string;
  contentRefund: string;
  name: string;
  type: string;
}

export interface IResRefundedOrder {
  items: IRefundedOrder[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface ISearchRefundedOrder {
  startDate?: string | null;
  endDate?: string | null;
  name?: string;
  orderId?: number;
  type?: string;
}

export interface IParamsRefundedOrder {
  page?: number;
  limit?: number;
  status?: string;
  startDate?: string | null;
  endDate?: string | null;
  orderId?: number;
  name?: string;
  type?: string;
}

export interface IParamsExportRefundedOrders {
  startDate: string;
  endDate: string;
}
