import { Variant } from './components/VariantTable/interface';

export enum ProductStatus {
  active = 'ACTIVE',
  banned = 'BANNED',
  in_active = 'IN_ACTIVE',
}
export enum TaxStatus {
  taxable = 'TAXABLE',
  none = 'NONE',
}
export enum ProductType {
  simple = 'SIMPLE',
  configurable = 'CONFIGURABLE',
  virtual = 'VIRTUAL',
}

export enum ProductLang {
  vn = 'VN',
  en = 'EN',
}
export type IProductCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export enum EnumVoucher {
  VOUCHER = 'VOUCHER',
  TOPUP = 'TOPUP',
  UNKNOWN = 'UNKNOWN',
}

export interface IProductTag {
  items: [
    {
      id: number;
      name: string;
      slug: string;
      description: string;
      userId: number;
    }
  ];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IProductCategory {
  items: [
    id: number,
    categoryDetails: [
      {
        id: number;
        lang: string;
        desc: string;
        name: string;
        slug: string;
      }
    ]
  ];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IAttributeProduct {
  items: {
    id: number;
    type: string;
    hasArchives: boolean;
    productAttributeDetails: [
      {
        id: number;
        description: string;
        lang: ProductLang;
        name: string;
        slug: string;
      }
    ];
  }[];
}

export interface IAttributeTermProduct {
  items: {
    id: number;
    productAttributeTermDetails: [
      {
        id: number;
        lang: ProductLang;
        value: string;
      }
    ];
  }[];
}

export interface IDetailProduct {
  id: number;
  status: ProductStatus;
  type: ProductType;
  isFeatured: boolean;
  onSale: boolean;
  taxStatus: TaxStatus;
  thumbnail: Image;
  productDetails: IProductDetail[];
  productCategories: IProductCategory[];
  productTags: IProductTag[];
  productVariants: Variant[];
}

export interface Image {
  id: number;
  key: string;
  type: string;
  size: number;
  url: string;
}

export interface IProductDetail {
  id: number;
  lang: string;
  name: string;
  description: string;
  shortDescription: string;
  slug: string;
}

export interface IProductCategory {
  id: number;
  categoryDetails: [
    {
      lang: string;
      desc: string;
      name: string;
      slug: string;
    }
  ];
}

export interface IProductTag {
  id: number;
  name: string;
  slug: string;
  description: string;
}

// export interface Variant {
//   id: number;
//   price: number;
//   quantity: number;
//   salePrice: number;
//   sku: string;
//   images: Image[];
//   productAttributeTerms: IProductAttributeTerm[];
//   externalProduct: IExternalProduct;
//   productVariantPoint: IProductVariantPoint;
// }

export interface IProductAttributeTerm {
  id: number;
  productAttributeId: number;
  productAttributeTermDetails: IProductAttributeTermDetail[];
  productAttribute: IProductAttribute;
}

export interface IProductAttributeTermDetail {
  id: number;
  lang: string;
  value: string;
}

export interface IProductAttribute {
  id: number;
  type: string;
  hasArchives: boolean;
  productAttributeDetails: IProductAttributeDetail[];
}

export interface IProductAttributeDetail {
  id: number;
  lang: string;
  name: string;
  description: string;
  slug: string;
}

export interface IProductInfo {
  title: string;
  thumbnail: string;
  condition: string;
}
export interface IExternalProductProvider {
  id: number;
  key: string;
  name: string;
  desc: string;
}

export interface IExternalProduct {
  id: number;
  type: EnumVoucher;
  externalIdentifier: string;
  productInfo: IProductInfo;
  externalProductProvider: IExternalProductProvider;
}

export interface IProductVariantPoint {
  id: number;
  point: number;
  salePoint: number;
  productVariant: string;
}

export interface IListVariant {
  items: Variant[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface ICommonSliceProps {
  selectVariantId: number[];
}
