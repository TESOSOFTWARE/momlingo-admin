export interface ICallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}

export interface IResConfigApp {
  [key: number]: IConfigApp;
}

export interface IConfigApp {
  id?: number;
  mobileVersion: number;
  deviceType?: string;
}

export interface ITableProps {
  row: IConfigApp;
}

export interface IDataEditConfigApp {
  id?: number;
  data: IConfigApp;
}
