export type IConfigFeatureCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IConfigFeatureList {
  featureConfig?: {
    [key: string]: {
      desc: string;
      status: boolean;
    };
  };
}

export interface IConfigFeatureListForm {
  [key: string]: {
    desc: string;
    status: boolean;
  };
}

export interface IConfigFeatureItem {
  desc: string;
  status: boolean;
}

export interface ConfigFeatureState {
  showDisable: boolean;
  confirmModal: {
    isOpen: boolean;
    text: string;
    callback: (...args: any[]) => any;
  };
}

export interface IPropsConfigFeatureListTable {
  rowCode: string;
  configFeatureList?: IConfigFeatureListForm;
}

export interface IFormChangeFeatureConfig {
  name: string;
  status: boolean;
}

export interface IReduxPayloadFeatureConfigItem extends IConfigFeatureItem {
  code: string;
}
