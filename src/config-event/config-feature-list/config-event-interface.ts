export type IConfigEventCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IConfigEventList {
  eventConfig?: {
    [key: string]: {
      desc: string;
      status: number;
      endDate: string;
      startDate: string;
    };
  };
}

export interface IConfigEventListForm {
  [key: string]: {
    desc: string;
    status: number;
    endDate: string;
    startDate: string;
  };
}

export interface IConfigEventItem {
  desc: string;
  status: boolean;
  startDate: string;
  endDate: string;
}

export interface ConfigEventState {
  showDisable: boolean;
  confirmModal: {
    isOpen: boolean;
    text: string;
    callback: (...args: any[]) => any;
  };
}

export interface IPropsConfigEventListTable {
  rowCode: string;
  configEventList?: IConfigEventListForm;
}

export interface IFormChangeEventConfig {
  desc: string;
  status: boolean;
  startDate: string;
  endDate: string;
}

export interface IReduxPayloadEventConfigItem extends IConfigEventItem {
  code: string;
}
