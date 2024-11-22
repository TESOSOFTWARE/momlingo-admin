export interface StateProps {
  numberSections: number;
  dataSectionBanner: any;
  dataRequest: IDataRequest[];
  listLinkBanner: any;
}

export interface IDataRequest {
  id: string;
  data: any;
  title?: string;
  typeRoute?: string;
}

export interface IResShareAppConfig {
  sections: IBannerData[];
}

export interface IBannerData {
  data: {
    image: string;
    imageId: number;
    link: string;
    params?: {
      key: string;
      value: string;
    }[];
  };
}

export interface IUpdateBanner {
  image: string | File;
  name: string | undefined;
  title: string;
  typeLink: string;
  route?: string;
  deepLink?: string;
  params?: [
    {
      key: string;
      value: string;
    }
  ];
}

export type IResMobileRoutes = {
  name: string;
  route: string;
  isNeedParams: boolean;
}[];

export interface ICallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}
