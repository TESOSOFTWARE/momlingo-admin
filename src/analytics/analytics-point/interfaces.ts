export interface IParamsStatisticPoint {
  startDate?: string | null;
  endDate?: string | null;
}

export interface IResLineChart {
  total: number;
  date: string;
}

export interface IResCircleChart {
  total: number;
}

export interface IPropsTableRow {
  row: IResLineChart;
  ordinal: number;
}
