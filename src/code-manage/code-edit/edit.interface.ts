import { CodeStatus } from '../code-common/interface';

export interface IEditParams {
  searchText: string;
  searchType: string;
  page?: number;
  limit?: number;
}

export interface IEditCode {
  code?: string;
  status: CodeStatus;
  useTime: number;
  createdAt?: string;
  expiresAt?: string;
  eventId?: number;
}

export interface IResEditDetail {
  items: [IEditCode];
}

export interface IResEvent {
  name: string;
}
