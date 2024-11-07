export interface IParams {
  page?: number;
  limit?: number;
}

export interface ICallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}

export interface IResListFileImport {
  items: IFileImport[];
  meta: {
    totalItems?: number;
    itemCount?: number;
    itemsPerPage?: number;
    totalPages?: number;
    currentPage?: number;
  };
}
export interface IFileImport {
  id: number;
  status: string;
  resource: string;
  createdAt: string;
  retryTime: number;
  fileName?: string;
  file: IFileType;
  user: any;
}

export interface IFileType {
  id?: number;
  key?: string;
  type?: string;
  url?: string;
  size?: number;
}
export interface IStatusFile {
  [key: string]: {
    name: string;
    color: string;
  };
}
