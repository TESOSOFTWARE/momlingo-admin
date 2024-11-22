import {
  API_BABY_GET_TRACKERS_WEEK,
  API_BABY_REMOVE_TRACKERS,
  API_BABY_TRACKERS,
  API_CONFIG_FEATURE,
} from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { PregnancyWeekInfo } from './baby-tracker-interface';
import { IConfigFeatureList } from './config-feature-interface';

export const getBabyTrackerList = async () => {
  return axiosInstance.get<unknown, PregnancyWeekInfo[]>(`${API_BABY_TRACKERS}`);
};

export const removeBabyTrackerList = async (param: string) => {
  return axiosInstance.delete(`${API_BABY_REMOVE_TRACKERS}/${param}`);
};

export const editBabyTrackerList = async (week: string, data: any) => {
  // Giả sử API yêu cầu gửi dữ liệu theo cách này
  const response = await axiosInstance.put(`${API_BABY_TRACKERS}/edit/${week}`, data);
  return response.data; // Trả về dữ liệu đã cập nhật
};

export const getBabyTrackerByWeek = async (week: string) => {
  return axiosInstance.get(`${API_BABY_GET_TRACKERS_WEEK}/${week}`);
};
export const newBabyTrackerList = async () => {
  return axiosInstance.get<unknown, IConfigFeatureList>(`${API_BABY_TRACKERS}`);
};
