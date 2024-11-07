export interface IRequestExportItem {
  id: number;
  status: string;
  resource: string;
  fileName: string;
  createdAt: string;
  file: IFileType | null;
}

export interface IFileType {
  id: number;
  key: string;
  type: string;
  url: string;
  size: number;
}

export interface IParamsGetList {
  page: number;
  limit: number;
}

export interface ICallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}

export interface IResRequestExport {
  items: IRequestExportItem[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
