export interface IResRuleConfigList {
  ruleConfig?: IRuleConfig;
}

export interface IRuleConfig {
  [key: string]: {
    desc: string;
    status: boolean;
    values:{
      [key: string]: string;
    };
  };
}

export interface IPropsTableRow {
    rowCode: string;
    listRuleConfig?: IRuleConfig;
}

export interface IFormChangeRuleConfig {
    name?: string;
    status?: boolean; 
}
export type ICallback = {
    onSuccess?: VoidFunction;
    onError?: VoidFunction;
};

export interface IFormRuleConfigItem {
    code: string;
    desc?: string;
    status?: boolean;
    values?: {
      [key: string]:string;
    };
}
  