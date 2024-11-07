import { Lang, LANG, TYPE } from '../constants/constants';

export interface LangObj {
  label: string;
  value: Lang;
  icon: string;
}

export type IProductAttributeDetails = {
  [lang in LANG]: {
    name: string;
    description: string;
  };
};

export type ISelectedLang = {
  payload: LangObj;
  type: string;
};

export interface IFormCreateProductValuesProps {
  type: TYPE;
  productAttributeDetails: IProductAttributeDetails;
}

export type IFormCreateProduct = {
  type: TYPE;
  productAttributeDetails: IProductAttributeDetails[];
};

export type IFormCreateProducts = {
  type: TYPE;
  productAttributeDetails: {
    vn: IProductAttributeDetails;
  };
};
export type IProductCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IPostProductStateProps {
  isPopup: boolean;
  dataPostProduct: IFormCreateProduct;
  selectedLang: LangObj;
}

export interface ISelectTypeOption {
  value: number | string;
  label: string;
}

export interface ISelectLangOption {
  value: number | string;
  label: string;
}

export type ITranslations = {
  lang: LANG;
  name: string;
  description: string;
};

export interface IProductAttributeDetail {
  lang: string;
  name: string;
  description: string;
}

export interface IProductAttribute {
  type: string;
  productAttributeDetails: IProductAttributeDetail[];
}

export interface ISubmitProduct {
  type: string;
  lang: string;
  name: string;
  description: string;
}
