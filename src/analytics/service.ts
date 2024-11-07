import { API_GAME_CHART, API_ORDER_CHART } from "../common/constants/apis";
import axiosInstance from "../common/utils/axios";
import { IGameChart, IOrdersChart, ISearchForm } from "./interface";

export const getOrderChart = (params:ISearchForm) => {
    return axiosInstance.get<unknown, IOrdersChart[]>(`${API_ORDER_CHART}/line-chart`,{params});
  };
  export const getOrderChartPie = (params:ISearchForm) => {
    return axiosInstance.get<unknown, { [key in string]: number }>(`${API_ORDER_CHART}/overview`,{params});
  };
  export const requestExportOrders = (params: ISearchForm) => {
    return axiosInstance.post(`${API_ORDER_CHART}/request-export`,params);
  };
  export const getGameChart = (params:ISearchForm) => {
    return axiosInstance.get<unknown, IGameChart[]>(`${API_GAME_CHART}/line-chart`,{params});
  };
  export const getGameChartPie = (params:ISearchForm) => {
    return axiosInstance.get<unknown, { [key in string]: number }>(`${API_GAME_CHART}/overview`,{params});
  };
  export const requestExportGame = (params: ISearchForm) => {
    return axiosInstance.post(`${API_GAME_CHART}/request-export`,params);
  };