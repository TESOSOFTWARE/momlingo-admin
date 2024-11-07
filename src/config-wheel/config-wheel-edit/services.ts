import axiosInstance from '../../common/utils/axios';
import { API_WHEEL } from 'src/common/constants/apis';
import { IResWheelDetail, IRequestForEditingWheel } from './interface';

export const getDetailWheel = (id: string | undefined) => {
  return axiosInstance.get<unknown, IResWheelDetail>(API_WHEEL + '/' + id);
};
export const editWheel = (data: IRequestForEditingWheel) => {
  return axiosInstance.patch(API_WHEEL, data);
};
