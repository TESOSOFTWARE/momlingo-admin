import axiosInstance from '../common/utils/axios';
import {
  API_CHILD_CREATE_TRACKERS,
  API_CHILD_EDIT_TRACKERS,
  API_CHILD_GET_TRACKERS_WEEK,
  API_CHILD_REMOVE_TRACKERS,
  API_CHILD_TRACKERS,
  API_RULE_CONFIG,
} from '../common/constants/apis';
import { ChildTracker, IResRuleConfigList } from './interfaces';

export const getListRule = () => {
  return axiosInstance.get<unknown, IResRuleConfigList>(API_RULE_CONFIG);
};

export const editConfigRule = (param: IResRuleConfigList) => {
  const data = axiosInstance.put(`${API_RULE_CONFIG}`, param);
  return data;
};

export const getListChildTracker = async () => {
  return axiosInstance.get<unknown, ChildTracker[]>(`${API_CHILD_TRACKERS}`);
};

export const removeBabyChildList = async (param: string) => {
  return axiosInstance.delete(`${API_CHILD_REMOVE_TRACKERS}/${param}`);
};

export const getChildTrackerByWeek = async (week: string) => {
  return axiosInstance.get(`${API_CHILD_GET_TRACKERS_WEEK}/${week}`);
};

export const editChildTrackerByWeek = async (week: string, data: any) => {
  const response = await axiosInstance.put(`${API_CHILD_EDIT_TRACKERS}`, data);
  return response.data;
};
export const newChildTrackerByWeek = async (week: string, data: any) => {
  const response = await axiosInstance.post(`${API_CHILD_CREATE_TRACKERS}`, data);
  return response.data;
};
