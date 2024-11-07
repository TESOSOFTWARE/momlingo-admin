export interface IInitialState {
  numberAddNewSection: number;
  numberSaveSection: number;
  itemSectionBanner: {
    link: string;
    image: string;
    imageId: number | null;
  };
  dataSectionBanner: any;
  itemNormalServiceSection: {
    link: string;
    name: string;
    image: string;
    imageId: number | null;
    id: string;
  };
  titleForNormalService: string;
  dataNormalServiceSection: any;
  itemHorizontalProductList: {
    maxLength: null | number;
    categoryId: null | number;
  };
  itemVerticalProductList: {
    maxLength: null | number;
    categoryId: null | number;
  };
  titleForHorizontalProduct: string;
  titleForVerticalProduct: string;
  addSectionValue: string;
  sections: any;
  dataRequest: IDataRequest[];
  listLinkBanner: any;
  hasReplaceImage: boolean;
  indexOfImageToReplace: null | number;
  listLinkNormalService: any;
  nameNormalServiceList: any;
  isOpenPreviewSection: boolean;
}
export enum ITypeSection {
  BANNER = 'BANNER',
  FLOAT_SERVICE = 'FLOAT_SERVICE',
  NORMAL_SERVICE = 'NORMAL_SERVICE',
  HORIZONTAL_PRODUCT_LIST_1 = 'HORIZONTAL_PRODUCT_LIST_1',
  HORIZONTAL_PRODUCT_LIST_2 = 'HORIZONTAL_PRODUCT_LIST_2',
}
export interface IHomeConfigDataResponse {
  sections: ISectionItem[];
}
export interface ISectionItem {
  id: string;
  data: {
    maxLength: number;
    categoryId: number;
  };
  type: string;
  title: string;
}
export interface BannerItem {
  link: string;
  image: string;
  imageId: number;
}
export interface IDataRequest {
  type: string;
  id: string;
  data: any;
  title?: string;
  typeRoute?: string;
}

export interface IUpdateBanner {
  image: string | File;
  name: string | undefined;
  title: string;
  typeLink: string;
  route?: string;
  deepLink?: string;
  params?: {};
}

export interface IUpdateNormalService {
  image: string | File;
  name: string | undefined;
  deepLink?: string;
  route?: string;
  nameService: string;
  title: string;
  typeLink: string;
  params?: {};
}
