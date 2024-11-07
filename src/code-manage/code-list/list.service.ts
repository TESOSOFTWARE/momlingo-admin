import { API_CODE_RELEASE } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { ICodeParams, IResCode } from './list.interface';

export const getCode = async (params: ICodeParams) => {
  return axiosInstance.get<unknown, IResCode>(`${API_CODE_RELEASE}`, {
    params: {
      searchText: params.searchText,
      searchType: params.searchType,
      page: params.page,
      limit: params.limit,
    },
  });
};

export const deleteCode = (code: string) => {
  const data = axiosInstance.delete(`${API_CODE_RELEASE}/${code}`, {
    data: { code: code },
  });
  return data;
};
