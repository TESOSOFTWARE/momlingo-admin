import axiosInstance from '../common/utils/axios';
import { API_RULE_CONFIG } from '../common/constants/apis';
import { IResRuleConfigList } from './interfaces';

export const getListRule= () => {
  return axiosInstance.get<unknown, IResRuleConfigList>(API_RULE_CONFIG);
};

export const editConfigRule = (param: IResRuleConfigList) => {
  const data = axiosInstance.put(`${API_RULE_CONFIG}`, param);
  return data;
};
