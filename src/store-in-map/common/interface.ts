export interface ICallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}

export interface INewStore {
  name: string;
  address: string;
  lat: number;
  long: number;
}

export interface IStoreItem {
  id: number;
  name: string;
  address: string;
  lat: number;
  long: number;
}
