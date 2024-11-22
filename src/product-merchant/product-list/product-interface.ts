import { ProductLang } from './../product-common/interface';
import { ProductStatus, TaxStatus, ProductType } from '../product-common/interface';

export interface IPropTableRow {
  row: IProductRow;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
  onDetailRow: VoidFunction;
}

export interface ProductDetails {
  name: string;
  description: string;
  shortDescription: string;
  createdAt: string;
  images: ProductImage;
}

export interface ProductToVariants {
  productVariant: {
    price: string;
    sku: string;
    quantity: number;
    salePrice: string;
    onSale: boolean;
  };
}

export interface IFormListProduct {
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
  productDetails: [
    {
      id: number;
      lang: ProductLang;
      description: string;
      name: string;
      shortDescription: string;
      slug: string;
    }
  ];
  priceRange: {
    normalPrice: number;
    salePrice: number;
    range?: {
      min: number;
      max: number;
    };
  };
}

export interface ProductImage {
  url: string;
  imagesId: number;
}

export interface IProductParams {
  searchText?: string;
  searchType?: ProductType | string;
  productStatus?: ProductStatus | string;
  taxStatus?: TaxStatus | string;
  productType?: ProductType | string;
  page?: number;
  limit?: number;
}

export interface IProductList {
  items: IFormListProduct[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IProductTransform {
  items?: IProductRow[];
  totalItems: number;
}

export interface InitialProductState {
  idDeleteProduct: number[];
  showPopup: boolean;
  filterProduct: IProductParams;
}

export interface IProductRow {
  id: number;
  isFeatured: boolean;
  status: string;
  taxStatus: string;
  type: string;
  lang: string;
  description: string;
  name: string;
  shortDescription: string;
  slug: string;
  normalPrice?: number;
  salePrice?: number;
  range?: {
    max: number;
    min: number;
  };
  thumbnailUrl: string;
  thumbnailId: number;
  thumbnailType: string;
  thumbnailSize: number;
  thumbnailKey: string;
  thumbnail?: {
    id: number;
    key: string;
    type: string;
    url: string;
    size: number;
  };
}

export interface IDeleteParams {
  ids: number[];
}
