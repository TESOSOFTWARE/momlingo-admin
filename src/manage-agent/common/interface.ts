export interface ICallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}

export interface IParamsCASL {
  page: number;
  limit: number;
  searchText?: string;
}
