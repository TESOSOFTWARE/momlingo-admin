import { API_BABY_REMOVE_TRACKERS, API_BABY_TRACKERS, API_CONFIG_FEATURE } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { PregnancyWeekInfo } from './baby-tracker-interface';
import { IConfigFeatureList } from './config-feature-interface';

export const getBabyTrackerList = async () => {
    return axiosInstance.get<unknown, PregnancyWeekInfo[]>(`${API_BABY_TRACKERS}`);
};

export const removeBabyTrackerList = async (param: string) => {
    return axiosInstance.delete(`${API_BABY_REMOVE_TRACKERS}/${param}`);
};

export const editBabyTrackerList = async () => {
    return axiosInstance.get<unknown, IConfigFeatureList>(`${API_BABY_TRACKERS}`);
};

export const newBabyTrackerList = async () => {
    return axiosInstance.get<unknown, IConfigFeatureList>(`${API_BABY_TRACKERS}`);
};
  