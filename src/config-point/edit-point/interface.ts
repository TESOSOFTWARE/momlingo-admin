export interface IDetailPoint {
  createdAt: string;
  id: number;
  code: string;
  point: string;
  type: string;
  description: string;
  isActive: boolean;
  productGroup: string | null;
  weight: number | null;
}

export interface IEditPoint {
  code: string;
  point: string;
  type: string;
  description: string;
  isActive: boolean;
  productGroup: string | null;
  weight: number | null;
}
