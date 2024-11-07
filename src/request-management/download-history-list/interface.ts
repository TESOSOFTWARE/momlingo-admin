export interface IResHistoryDownload {
  items: IFormHistoryDownload[];
  meta: {
    [key in string]: number;
  };
}

export interface IFormHistoryDownload {
  [key: string]: string;
}

export interface IPropsTableRow {
  row: IFormHistoryDownload;
}

export interface IListHistoryDownloadParams {
  page: number;
  limit: number;
  fileName?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

export interface ISearchRequest {
  [key: string]: string | null | undefined;
}

export interface ISliceForm {
  searchForm: ISearchRequest;
}
