export interface INewPoint {
  type: string;
  point: number;
  code?: string;
  description: string;
  isActive: boolean;
  weight?: number;
  productGroup?: string;
}

export interface IParamsRequest {
  page?: number;
  limit?: number;
  weight?: number | null;
  productGroup?: string;
  type?: string;
}

export type IQRCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};
