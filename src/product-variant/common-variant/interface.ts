export interface IProductAttributeDetail {
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

export interface IListAttribute {
  items: IProductAttribute[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IAttributeTermList {
  items: IProductAttributeTermDetail[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
export interface IProductAttributeTermDetail {
  id: number;
  productAttributeId: number;
  productAttributeTermDetails: IProductAttributeTerm[];
  productAttribute: IProductAttribute;
}
export interface IProductAttributeTerm {
  id: number;
  lang: string;
  value: string;
}

export type ICallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IAttributeParams {
  page: number;
  limit: number;
}

export interface ITermParams {
  productAttributeId?: number;
  page?: number;
  limit?: number;
}
