import { LANG, TYPE } from '../constants/constants';

export type IProductListStateProps = {
  confirmPopup: boolean;
  selectIdsAttribute: number[];
};

export interface IFormProductAttribute {
  id: number;
  type: TYPE;
  hasArchives: boolean;
  productAttributeDetails: IProductAttributeDetails[];
}

export interface IProductAttributeDetails {
  id: number;
  description: string;
  lang: LANG.VIETNAMESE | LANG.ENGLISH;
  name: string;
  slug: string;
}

export interface IPropsProductAttribute {
  row: IFormProductAttribute;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
}

export interface IProductAttributeParams {
  page: number;
  limit: number;
}

export interface IDataProductAttribute {
  items: IFormProductAttribute[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export type ICallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IParamsDelete {
  ids: number[];
}
