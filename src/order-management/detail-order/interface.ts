import { IProductAttributeDetail } from '../../product-merchant/product-common/interface';
import { EnumType } from '../common/interface';

export interface IDetailOrder {
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
  orderLineItemReqDto: IOrderLine[];
  user: {
    id: number;
    customer: {
      phoneNumber: string;
      name: string;
    };
  };
}

interface IProductAttributeTermDetail {
  id: number;
  lang: string;
  value: string;
}

interface IProductAttribute {
  id: number;
  type: string;
  productAttributeDetails: IProductAttributeDetail[];
}

interface IProductAttributeTerm {
  id: number;
  productAttributeTermDetails: IProductAttributeTermDetail[];
  productAttribute: IProductAttribute;
}

interface IProductVariant {
  id: number;
  price: number;
  quantity: number;
  salePrice: number;
  sku: string;
  productAttributeTerms: IProductAttributeTerm[];
  productTransportInfo: {
    width: number;
    height: number;
    length: number;
    weight: number;
  };
}

interface IProductDetail {
  lang: string;
  name: string;
  description: string;
  shortDescription: string;
  slug: string;
}

interface IProductThumbnail {
  id: number;
  key: string;
  type: string;
  url: string;
}

interface IProduct {
  onSale: boolean;
  id: number;
  type: string;
  status:string;
  isFeatured: boolean;
  taxStatus: string;
  defaultProductVariantId: number;
  thumbnail: IProductThumbnail;
  productDetails: IProductDetail[];
  productVariants: IProductVariant[];
}

export interface IOrderLine {
  quantity: number;
  point: number;
  price: number;
  total: number;
  transactionId: string;
  usedTime: string;
  endDate: string;
  status: string;
  product: IProduct;
  externalProductUsedInfos: IExternalProductUsedInfos[];
  
}

export interface IExternalProductUsedInfos {
  id: number;
  type: string;
  status: string;
  expiresAt: string;
  usedAt: string;
  product: any;
  transactionId: string;
  externalProduct: any;
}

export interface IPropsTableRow {
  row: IOrderLine;
  onDetailRow: VoidFunction;
}

export interface EnumRequiredNote {
  CHOTHUHANG: 'CHOTHUHANG';
  CHOXEMHANGKHONGTHU: 'CHOXEMHANGKHONGTHU';
  KHONGCHOXEMHANG: 'KHONGCHOXEMHANG ';
}

export interface IOrderDelivery {
  shop_id?: number;
  from_name?: string;
  from_phone?: string;
  from_address?: string;
  from_ward_name?: string;
  from_district_name?: string;
  from_province_name?: string;
  to_name: string;
  to_phone: string;
  to_address: string;
  to_ward_name: string;
  to_district_name: string;
  to_province_name: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  service_id: number;
  payment_type_id: number;
  required_note: string;
  items: {
    name: string;
    quantity: number;
    code: string;
    price: number;
    length: number;
    width: number;
    height: number;
  }[];
  name?: string;
  quantity: number;
}
export interface StateProps {
  orderDelivery: IOrderDelivery;
  isPopup: boolean;
  dataDelivery: IOrderDelivery;
  checkType: EnumType;
  isOpenModalRefund: boolean;
}

export interface IListProvinces {
  data: [
    {
      ProvinceID: number;
      ProvinceName: string;
      CountryID: number;
      Code: number;
      NameExtension: string[];
    }
  ];
}

export interface IListDistrict {
  data: [
    {
      DistrictID: number;
      ProvinceID: number;
      DistrictName: string;
      Code: number;
      Type: number;
      SupportType: number;
      NameExtension: string[];
    }
  ];
}

export interface IDistrictShop {
  data: {
    shops: [
      {
        _id: number;
        name: number;
        phone: number;
        address: string;
        ward_code: string;
        district_id: number;
        client_id: number;
        bank_account_id: number;
        status: number;
      }
    ];
  };
}

export interface IAvailableService {
  data: [
    {
      service_id: number;
      short_name: string;
      service_type_id: number;
    }
  ];
}

export interface IModalSubmit {
  service_id: number;
  required_note: string;
  provinces: number;
  district: number;
  idDistrictShop: { value: number; label: string; _id: number };
}

export interface IDataRefundPoint {
  id: number;
  data: {
    content: string;
    refundPoint: number;
  };
}
