import { CustomFile } from '../common/components/upload';
import {
  ProductLang,
  ProductStatus,
  ProductType,
  TaxStatus,
} from '../product-merchant/product-common/interface';
import { IUser } from '../user-management/interfaces';
import { TypeGameConstraints } from './constants';

export interface ICallback {
  onSuccess?: VoidFunction;
  onError?: VoidFunction;
}

export interface IResListGameGifts {
  items: IGameGifts[];
  meta: {
    totalItems?: number;
    itemCount?: number;
    itemsPerPage?: number;
    totalPages?: number;
    currentPage?: number;
  };
}

export interface IResProductVariant {
  items: IProductVariant[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IGameGifts {
  id: number;
  name: string;
  totalQuantity?: number;
  startDate: string;
  endDate: string;
  status: string;
  ordinal: number;
  posInImage: number;
  isWonMultiple: boolean;
  winRate: number;
  quantity: number;
  wonQuantity: number;
  game: any;
  isWinnable: boolean;
  productVariant: IProductVariant;
  gameGiftConstraints: IGameGiftConstraints;
  gameWinHistories: IGameWinHistories;
}

export interface IGame {
  id?: number;
  name?: string;
  startDate?: string;
  endDate?: string;
  image?: any;
  gameGifts?: any;
  owner?: any;
  gameType?: IGameType;
  gamePlayHistories?: any;
  createdAt?: string;
}
export interface IGameType {
  id: number;
  type: string;
  game: any;
}
export interface IGameGiftConstraints {
  id?: number;
  type?: string;
  gameGift?: any;
}

export interface IGameWinHistories {
  id?: number;
  gameGift?: any;
  gamePlayHistory?: IGamePlayHistory;
  createdAt?: string;
}

export interface IGamePlayHistory {
  gameWinHistory?: any;
  user?: {
    id?: number;
    type?: string;
    customer?: IUser;
  };
  id?: number;
  action?: string;
  type?: string;
  value?: number;
}

export interface IProductVariant {
  id: number;
  price: number;
  quantity: number;
  salePrice: number;
  sku: any;
  images: any;
  productAttributeTerms: any;
  externalProduct: any;
  productVariantPoint: any;
  productToVariantId: any;
  productTransportInfo: any;
  name: string;
  productVariantDetails: any;
}

export interface IPropsTableRow {
  row: IGameGifts;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
}

export interface IParamsGetList {
  page?: number;
  limit?: number;
  gameId?: number;
}

export interface IParamsDeleteGameGift {
  ids: number[];
}

export interface IFormDataGameGift {
  isWinnable?: boolean;
  type?: string;
  gameGiftProvinceQuantities?: any;
  gameGiftProvinceConstraints: IFormGameGiftProvinceConstraints[];
  gameGiftAllocationConstraints: IFormGameGiftAllocationConstraints[];
  startDate?: string | null;
  endDate?: string | null;
  status?: string | boolean;
  ordinal?: number;
  posInImage?: number;
  productId?: number;
  productVariantId?: any;
  quantity?: number;
  gameId?: number;
  winRate?: number;
  isWonMultiple?: boolean;
  imageId?: CustomFile | string;
  image?: {
    id?: number;
    url?: string;
  };
  name?: string;
  typePrize?: string;
}

export interface IFormCreateGameGift {
  isWinnable?: boolean;
  type?: string;
  constraintPhoneNumber: string[];
  constraintProvince: {
    id: number;
    name: string;
  }[];
  gameGiftProvinceQuantities?: {
    provinceId: any;
    quantity: number;
  }[];
  gameGiftProvinceConstraints: IFormGameGiftProvinceConstraints[];
  gameGiftAllocationConstraints: IFormGameGiftAllocationConstraints[];
  startDate?: string | null;
  endDate?: string | null;
  status?: boolean;
  ordinal?: number;
  posInImage?: number;
  isWonMultiple?: boolean;
  productId?: any;
  productVariantId?: any;
  quantity?: number;
  gameId?: number;
  winRate?: number;
  imageId?: CustomFile | string;
  image?: {
    id?: number;
    url?: string;
  };
  name?: string;
  typePrize?: string;
}

export interface IFormGameGiftProvinceConstraints {
  provinceId?: any;
}

export interface IFormGameGiftAllocationConstraints {
  phoneNumber: string;
}

export interface IFormEditGameGift extends IFormDataGameGift {
  id?: number;
}

export interface IResGameGiftProvinceConstraints {
  id: number;
  province?: {
    id?: number;
    name?: string;
    type?: string;
    parentId?: number;
  };
  provinceId?: any;
  addWinRate: number;
}

export interface IResGameGiftAllocationConstraints {
  phoneNumber: string;
  addWinRate: number;
}

export interface IResGameGiftById {
  id?: number;
  status?: string;
  type?: string;
  totalQuantity?: number;
  isWinnable?: boolean;
  gameGiftConstraints?: any;
  gameGiftProvinceQuantities?: any;
  gameGiftProvinceConstraints?: IResGameGiftProvinceConstraints[];
  gameGiftAllocationConstraints?: IResGameGiftAllocationConstraints[];
  startDate?: string | null;
  endDate?: string | null;
  ordinal?: number;
  posInImage?: number;
  isWonMultiple?: boolean;
  productVariant?: {
    id: number;
    price: number;
    quantity: number;
    salePrice: number;
    sku: string;
    name: string;
  };
  product?: {
    onSale: boolean;
    id: number;
    type: string;
    status: string;
  };
  quantity?: number;
  gameId?: number;
  winRate?: number;
  imageId?: number;
  name?: string;
  image?: {
    id: number;
    key: string;
    url: string;
  };
}

export interface IParamsProductVariant {
  page?: number;
  limit?: number;
  isLinkedWithExternal?: boolean;
  searchText?: string;
}

export interface IParamsProductVirtual {
  page?: number;
  limit?: number;
  searchType?: string;
  searchText?: string;
  productType?: string;
}

export interface IParamsListUser {
  page?: number;
  limit?: number;
  phoneNumber?: string;
}

export interface IResProductVirtual {
  items: IProduct[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IProduct {
  id: number;
  isFeatured: boolean;
  onSale?: boolean;
  status: ProductStatus;
  taxStatus: TaxStatus;
  type: ProductType;
  thumbnail: {
    createdAt: string;
    id: number;
    key: string;
    url: string;
    type: string;
    size: number;
    uploaderId: number;
  };
  productDetails: IProductDetails[];
  productVariants: IProductVirtualVariant[];
}

export interface IProductVirtualVariant {
  id: number;
  name: string;
}

export interface IProductDetails {
  id: number;
  lang: ProductLang;
  description: string;
  name: string;
  shortDescription: string;
  slug: string;
}

export interface IResProductById {
  id: number;
  productVariants: any;
  productDetails: IProductDetails[];
}

export interface ICallback {
  onSuccess?: VoidFunction;
  onError?: VoidFunction;
}
