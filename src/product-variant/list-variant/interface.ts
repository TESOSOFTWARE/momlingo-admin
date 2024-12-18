export interface IPropTableRow {
  row: IVariant;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
}
export interface IVariant {
  id: number;
  name: string | null;
  price: number;
  quantity: number;
  salePrice: number;
  sku: string;
  images: Image[];
  productAttributeTerms: ProductAttributeTerm[];
  externalProduct: ExternalProduct;
  productVariantPoint: ProductVariantPoint;
}

export interface IListStateProps {
  isPopup: boolean;
  selectId: number[];
}

export interface Image {
  id: number;
  key: string;
  type: string;
  url: string;
  size: number;
}

export interface ProductAttributeTerm {
  id: number;
  productAttributeId: number;
  productAttributeTermDetails: ProductAttributeTermDetail[];
  productAttribute: ProductAttribute;
}

export interface ProductAttributeTermDetail {
  id: number;
  lang: string;
  value: string;
}

export interface ProductAttribute {
  id: number;
  type: string;
  hasArchives: boolean;
  productAttributeDetails: ProductAttributeDetail[];
}

export interface ProductAttributeDetail {
  id: number;
  lang: string;
  name: string;
  description: string;
  slug: string;
}

export interface ExternalProduct {
  id: number;
  type: string;
  externalIdentifier: string;
  productInfo: ProductInfo;
  externalProductProvider: ExternalProductProvider;
}

export interface ProductInfo {
  title: string;
  thumbnail: string;
  condition: string;
}

export interface ExternalProductProvider {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  version: number;
  id: number;
  key: string;
  name: string | null;
  desc: string | null;
  userId: number;
}

export interface ProductVariantPoint {
  id: number;
  point: number;
  salePoint: number;
  productVariant: {};
}

export interface IListVariant {
  items: IVariant[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IDeleteProp {
  ids: number[];
}
