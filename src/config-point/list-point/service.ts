import { API_POINT } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IDeletePoint, IListPoint, IPointParams } from './interface';

export const getPoint = async (params: IPointParams) => {
  return axiosInstance.get<unknown, IListPoint>(`${API_POINT}`, {
    params: {
      searchText: params.searchText,
      type: params.type,
      isActive: params.isActive,
      page: params.page,
      limit: params.limit,
    },
  });
};

// export const deletePoint = (ids: number[]) => {
//   return axiosInstance.delete(`${API_POINT}/${ids}`);
// };

export const deletePoint = ({ data }: { data: IDeletePoint }) =>
  axiosInstance.delete(`${API_POINT}`, { data });
