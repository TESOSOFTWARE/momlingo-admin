export interface IParamsStatisticSpoon {
  status?: string;
  startDate?: string | null;
  endDate?: string | null;
}

export interface IResLineChart {
  total: number;
  data: {
    [key: string]: string | number;
    date: string;
    ALL: number;
  };
}

export interface IResCircleChart {
  data: {
    ALL: number;
  };
}

export interface IRequestExport {
  id: number;
}

export interface ICallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}

export interface IPropsTableRow {
  row: IResLineChart;
  ordinal: number;
}
