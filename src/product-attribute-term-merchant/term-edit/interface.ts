export interface IProductAttributeTermDetail {
  id?: number;
  lang: string;
  value: string;
}

export interface IProductAttribute {
  id: number;
  type: string;
  hasArchives: boolean;
  productAttributeDetails: IProductAttributeDetail[];
}

export interface IProductAttributeDetail {
  id: number;
  lang: string;
  name: string;
  description: string;
  slug: string;
}

export interface IProductAttributeTerm {
  id: number;
  productAttributeId: number;
  productAttributeTermDetails: IProductAttributeTermDetail[];
  productAttribute: IProductAttribute;
}

export interface IPutAttributeTerm {
  productAttributeId: number;
  productAttributeTermDetails: IProductAttributeTermDetail[];
  id: number;
}

export interface IConvertTermData {
  productAttributeId: { id: number; name: string };
  lang: string;
  term: string;
  lang2?: string;
  term2?: string;
  another?: boolean;
}
