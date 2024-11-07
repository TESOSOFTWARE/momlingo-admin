export interface ICallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}

export enum EnumType {
  VOUCHER = 'VOUCHER',
  PHYSICAL = 'PHYSICAL',
}

export interface IPropsTableRow {
  row: IHistoryGiftUser;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onEditRow: VoidFunction;
  onDetailRow: VoidFunction;
}

export interface IUser {
  id: number;
  type: string;
  customer: {
    id: number;
    phoneNumber: string;
    address: string | null;
    email: string | null;
    name: string;
    birthDate: string;
    tierCode: string;
    lackRankPoint: number;
    lastVisitDate: string;
    lastScanDate: string;
    createdAt: string;
    gender: string | null;
    status: string;
    userPoint: {
      totalPoints: number;
    };
  };
}

export interface IHistoryGiftUser {
  expressDeliveryCode?: string;
  createdAt: string;
  id: number;
  status: string;
  note: null | string;
  currency: null | string;
  paidAt: null | string;
  transactionId: null | string;
  total: number;
  shippingTotal: number;
  discountTotal: number;
  type: EnumType;
  orderShipping: {
    id: number;
    userId: number;
    name: string;
    address1: string;
    province: string;
    ward: string;
    district: string;
    phone: string;
    isDefault: boolean;
  };
  user: IUser;
  orderLineItemReqDto: Array<{
    quantity: number;
    point: number;
    price: number;
    total: number;
    product: {
      onSale: boolean;
      id: number;
      type: string;
      isFeatured: boolean;
      taxStatus: string;
      defaultProductVariantId: number;
      thumbnail: {
        id: number;
        key: string;
        type: string;
        url: string;
      };
      productDetails: Array<{
        lang: string;
        name: string;
        description: string;
        shortDescription: string;
        slug: string;
      }>;
      productVariants: Array<{
        id: number;
        price: number;
        quantity: number;
        salePrice: number;
        sku: string;
        productAttributeTerms: Array<{
          id: number;
          productAttributeTermDetails: Array<{
            id: number;
            lang: string;
            value: string;
          }>;
          productAttribute: {
            id: number;
            type: string;
            productAttributeDetails: Array<{
              id: number;
              lang: string;
              name: string;
              description: string;
              slug: string;
            }>;
          };
        }>;
      }>;
    };
  }>;
}

export interface IHistoryGiftUserManagement {
  id: number;
  createAt: string;
  phoneUser: string;
  orderStatus: OrderStatus | string;
  expressDeliveryCode?: string;
}
export interface IHistoryGiftUserList {
  items: IHistoryGiftUser[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
  TRASH = 'TRASH',
  CREATED = 'CREATED',
  IMPORTED = 'IMPORTED',
  ALL = '',
}

export type IHistoryGiftUserFilter = {
  status: OrderStatus;
  startDate: string | null;
  endDate: string | null;
  phone: string;
  orderId: number;
};

export interface IHistoryGiftUserParams {
  status?: string;
  startDate?: string | null;
  endDate?: string | null;
  phone?: string;
  orderId?: number| null;
  page?: number;
  limit?: number;
  userId?: number;
  type?: string;
}

export interface InitialHistoryGiftUserState {
  dataSearch: IHistoryGiftUserParams;
  value: number;
}

export interface IStatusOrderGift {
  [key: string]: {
    label: string;
    color: string;
  };
}
