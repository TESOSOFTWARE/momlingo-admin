export type IAttributeTermCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export enum ProductLang {
  vn = 'VN',
  en = 'EN',
}

export interface IAttributeParams {
  page: number;
  limit: number;
}
