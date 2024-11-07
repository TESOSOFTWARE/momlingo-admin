export interface IProductAttribute {
  id: number;
  type: string;
  hasArchives: boolean;
  productAttributeDetails: IProductAttributeDetail[];
  productAttributeTerms: IProductAttributeTerm[];
}

export interface IProductAttributeDetail {
  id: number;
  lang: string;
  name: string;
  description: string;
}

export interface IProductAttributeTerm {
  id: number;
  productAttributeId: number;
  productAttributeTermDetails: IProductAttributeTermDetail[];
}

export interface IProductAttributeTermDetail {
  id: number;
  lang: string;
  value: string;
}

export interface IConvertAttribute {
  type: string;
  lang: string;
  name: string;
  description: string;
}

export interface IPutAttribute {
  type: string;
  productAttributeDetails: [
    {
      lang: string;
      name: string;
      description: string;
    }
  ];
  id: number;
}

export type ICallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};
