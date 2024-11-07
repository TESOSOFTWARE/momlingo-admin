import { listTermIds } from './../edit-variant/slice';
import { CustomFile } from '../../common/components/upload';

export interface IProductVariant {
  productVariantDetails: [
    {
      lang: string;
      description: string;
    }
  ];
  price: number;
  salePrice: number;
  sku: string;
  quantity: number;
  imageIds: number[];
  productAttributeTermIds: number[];
  point: number;
  salePoint: number;
  externalProductId: number;
  name: string;
  width: number;
  height: number;
  length: number;
  weight: number;
}
export interface ISelect {
  id: number;
  name: string;
}

export interface ISubmitVariant {
  [key: string]: any;
  name: string;
  price: number;
  salePrice: number;
  sku: string;
  quantity: number;
  imageIds: number[];
  productAttributeTermId: number;
  photoURL: CustomFile | string;
  productAttributeId: ISelect;
  point: number;
  salePoint: number;
  externalProductId: {
    value: number;
    label: string;
    image: string;
    condition: string;
    content: string;
    office: [
      {
        address: string;
        cityName: string;
      }
    ];
  };
  width: number;
  height: number;
  length: number;
  weight: number;
  descriptionVariant: string;
  langVariant: string;
}

export interface IListVariantParams {
  searchText?: string;
  isLinkedWithExternal?: boolean;
  page: number;
  limit: number;
}

export interface IProductInfo {
  title: string;
  thumbnail: string;
  condition: string;
  content: string;
  office: [
    {
      address: string;
      cityName: string;
    }
  ];
}

export interface IExternalProductProvider {
  id: number;
  key: string;
  name: string;
  desc: string;
}

export interface IExternalItems {
  id: number;
  type: string;
  externalIdentifier: string;
  productInfo: IProductInfo;
  externalProductProvider: IExternalProductProvider;
}

export interface IExternalProduct {
  items: IExternalItems[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}

export interface IVariantSlice {
  listFormAtt: string[];
  page: number;
  searchExternal: string;
  listTermIds: number[];
  termNewId: number;
}

export interface IParamsExternal {
  searchText?: string | null;
  page?: number;
  limit?: number;
  types?: string;
}

export interface IDataExternal {
  condition: string;
  office: [
    {
      address: string;
      cityName: string;
    }
  ];
  content: string;
}
