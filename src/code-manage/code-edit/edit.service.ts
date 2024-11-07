import { API_CODE_RELEASE, API_WHEEL } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IEditCode, IEditParams, IResEditDetail, IResEvent } from './edit.interface';

export const getCodeEdit = async (params: IEditParams) => {
  return axiosInstance.get<unknown, IResEditDetail>(`${API_CODE_RELEASE}`, {
    params: {
      searchText: params.searchText,
      searchType: params.searchType,
      page: params.page,
      limit: params.limit,
    },
  });
};

export const editCode = ({ data }: { data: IEditCode }) =>
  axiosInstance.put(`${API_CODE_RELEASE}`, data);

export const getEventById = (eventId: number) =>
  axiosInstance.get<unknown, IResEvent>(`${API_WHEEL}/${eventId}`);
