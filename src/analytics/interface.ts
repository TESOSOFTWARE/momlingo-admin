import { API_GAME_CHART, API_ORDER_CHART } from '../common/constants/apis';
import axiosInstance from '../common/utils/axios';

export interface IOrdersChart {
  date: string;
  total: number;
  totalPhysical: number;
  totalVoucher: number;
}
export interface IPropsTableRow {
  row: IOrdersChart;
  index: number;
}
export interface IPropsTableRowGame {
  row: IGameChart;
  index: number;
}
export interface IGameChart {
  date: string;
  total: number;
  totalWon: number;
}
export interface ISearchForm {
  startDate?: string | null;
  endDate?: string | null;
}
export type StateProps = {
  searchParams: ISearchForm;
  searchParamsGame: ISearchForm;
  confirmModal: {
    callback: VoidFunction;
    isOpen: boolean;
    text: string;
  };
};

export type ICallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export function stableSort<T>(array: T[]) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  return stabilizedThis.map((el) => el[0]);
}
