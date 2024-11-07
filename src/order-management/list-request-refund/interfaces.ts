import { IOrder } from '../list-physical/interface';

export interface IPropsTableRow {
  row: IRefundedOrderRequest;
}

export interface IRefundedOrderRequest {
  id:number;
  createdAt:string;
  orderRefund:{
    id:number;
    contentRefund:string | null;
    reasonRefund:string  | null;
    status:string;
    createdDate:string;
  }
  user:{
    customer:{
      phoneNumber:string;
      name:string
    }
  }
}

export interface IResRefundedOrderRequest {
  items: IRefundedOrderRequest[];
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
  orderId?: number;
}

export interface IParamsRefundedOrderRequest {
  page?: number;
  limit?: number;
  orderRefundStatus: string;
  startDate?: string | null;
  endDate?: string | null;
  orderId?: number;
}
export interface IRequestRefundParams {
  refundPoint?:number;
  content:string;
}

