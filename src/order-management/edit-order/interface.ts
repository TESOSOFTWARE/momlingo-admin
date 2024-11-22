import { EnumType, OrderStatus } from '../common/interface';

export interface IEditOrder {
  id: number;
  createAt: string;
  status: OrderStatus | string;
  name: string;
  phone: string;
  fullAddress: string;
}

export interface IEditDataOrder {
  orderId: number;
  status: string;
  name: string;
  phone: string;
  address1?: string;
  province?: string;
  district?: string;
  ward?: string;
}

export interface IDetailOrder {
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
  orderLineItemReqDto: {
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
      productDetails: {
        lang: string;
        name: string;
        description: string;
        shortDescription: string;
        slug: string;
      }[];
      productVariants: {
        id: number;
        price: number;
        quantity: number;
        salePrice: number;
        sku: string;
        productAttributeTerms: {
          id: number;
          productAttributeTermDetails: {
            id: number;
            lang: string;
            value: string;
          }[];
          productAttribute: {
            id: number;
            type: string;
            productAttributeDetails: {
              id: number;
              lang: string;
              name: string;
              description: string;
              slug: string;
            }[];
          };
        }[];
      }[];
    };
  }[];
}

export interface AddressParams {
  type: string;
  parentId?: number;
  searchText?: string;
  page?: number;
  limit?: number;
}

export interface AddressData {
  items: IAddressItem[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface InitialOrderState {
  provinceId: number;
  isOpenModalEditAddress: boolean;
  pickAddress: IAddress;
}
export interface IAddress {
  province?: IAddressItem;
  district?: IAddressItem;
  ward?: IAddressItem;
  address1?: string;
}

export interface IAddressItem {
  id: number;
  name: string;
  type: string;
  parentId: number;
}
