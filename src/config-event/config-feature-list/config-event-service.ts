import { API_CONFIG_EVENT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IConfigEventList } from './config-event-interface';

export const getConfigEvent = async () => {
  return axiosInstance.get<unknown, IConfigEventList>(`${API_CONFIG_EVENT}`);
};

export const editConfigEvent = (param: IConfigEventList) => {
  const data = axiosInstance.put(`${API_CONFIG_EVENT}`, param);
  return data;
};
