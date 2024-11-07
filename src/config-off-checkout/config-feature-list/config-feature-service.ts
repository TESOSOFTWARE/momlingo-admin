import { API_CONFIG_FEATURE } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IConfigFeatureList } from './config-feature-interface';

export const getConfigFeature = async () => {
  return axiosInstance.get<unknown, IConfigFeatureList>(`${API_CONFIG_FEATURE}`);
};

export const editConfigFeature = (param: IConfigFeatureList) => {
  const data = axiosInstance.put(`${API_CONFIG_FEATURE}`, param);
  return data;
};
