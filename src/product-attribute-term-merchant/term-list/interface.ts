export interface IProductAttributeTerm {
  id: number;
  lang: string;
  value: string;
}

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

export interface IProductAttributeTermDetail {
  id: number;
  productAttributeId: number;
  productAttributeTermDetails: IProductAttributeTerm[];
  productAttribute: IProductAttribute;
}

export interface IRowTerm {
  attributeName: string;
  productAttributeTermDetails: {
    lang: string;
    value: string;
  }[];
}

export interface IPropsTableRow {
  row: IProductAttributeTermDetail;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
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

export interface IListTermParams {
  productAttributeId?: number;
  page: number;
  limit: number;
}

export interface IPropsTermSlice {
  showToggled: boolean;
}

export interface IListStateProps {
  isPopup: boolean;
  selectId: number[];
}

export interface IDeleteParams {
  ids: number[];
}
