import { CustomFile } from '../../common/components/upload';

export interface Image {
  id: number;
  key: string;
  type: string;
  size: number;
  url: string;
}

export interface IProductAttributeTermDetail {
  id: number;
  lang: string;
  value: string;
}

interface IProductAttributeDetail {
  id: number;
  lang: string;
  name: string;
  description: string;
  slug: string;
}

export interface IProductAttribute {
  id: number;
  type: string;
  hasArchives: boolean;
  productAttributeDetails: IProductAttributeDetail[];
}

export interface IProductAttributeTerm {
  id: number;
  productAttributeId: number;
  productAttributeTermDetails: IProductAttributeTermDetail[];
  productAttribute: IProductAttribute;
}

export interface IProductPoint {
  id: number;
  point: number;
  salePoint: number;
  productVariant: null;
}

export interface IEditProductVariant {
  id: number;
  sku: string;
  quantity: number;
  imageIds: number[];
  productAttributeTermIds: number[] | undefined;
  price: number;
  salePrice: number;
  point: number;
  salePoint: number;
  externalProductId: number | undefined;
  name: string;
  width: number;
  height: number;
  length: number;
  weight: number;
  productVariantDetails: [
    {
      id: number;
      lang: string;
      description: string;
    }
  ];
}

export interface ISelect {
  id: number;
  value: number;
  label: string;
  image?: string;
  condition: string;
  office: [
    {
      address: string;
      cityName: string;
    }
  ];
  content: string;
}

export interface IConvertVariantData {
  id: number;
  sku: string;
  price: number;
  salePrice: number;
  quantity: number;
  imageIds: Image[];
  productAttributeId: ISelect;
  productAttributeTermId: ISelect[];
  photoURL: CustomFile | string;
}

export interface IEditSlice {
  listFormAtt: string[];
  page: number;
  searchExternal: string;
  listTermIds: number[];
  termIdNew: number;
}
export interface ITransportInfo {
  id: number;
  width: number;
  height: number;
  length: number;
  weight: number;
  productVariant: any | null;
}

export interface IExternal {
  id: number;
  type: string;
  externalIdentifier: number;
  productInfo: {
    title: string;
    thumbnail: string;
    condition: null;
  };
}
export interface IDataVariantDetail {
  id: number;
  name: string;
  price: number;
  quantity: number;
  salePrice: number;
  sku: string;
  images: Image[];
  productAttributeTerms: IProductAttributeTerm[];
  externalProduct?: IExternal | null;
  productVariantPoint: IProductPoint;
  productTransportInfo: ITransportInfo;
  productVariantDetails: [
    {
      id: number;
      lang: string;
      description: string;
    }
  ];
}

export interface IVariantDetail {
  sku: string;
  name: string;
  quantity: number;
  width: number;
  length: number;
  height: number;
  weight: number;
  price: number;
  salePrice: number;
  point: number;
  salePoint: number;
  photoURL: CustomFile | string;
  externalProductId?: ISelect | null;
  listAttribute: [
    {
      [key: string]: any;
    }
  ];
  [key: string]: any;
  descriptionVariant: string;
  langVariant: string;
}
