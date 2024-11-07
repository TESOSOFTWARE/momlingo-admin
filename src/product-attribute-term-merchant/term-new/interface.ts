import { ProductLang } from '../term-common/interface';

export interface IAttributeTermDetail {
  lang: string;
  value: string;
}
export interface IAttributeTerm {
  productAttributeId: number;
  productAttributeTermDetails: IAttributeTermDetail[];
}

export interface ISubmitAttributeTerm {
  productAttributeId: {
    name: string;
    id: number;
  };
  lang: string;
  value: string;
  lang2?: string;
  value2?: string;
  another?: boolean;
}

export interface IAttributeList {
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

export interface IPropsTermSlice {
  showToggled: boolean;
}
