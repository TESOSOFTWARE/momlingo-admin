import { CustomFile } from '../../common/components/upload';

export interface IGetListParams {
  page: number;
  limit: number;
}

export interface IResListGift {
  items: IGiftData[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IGiftData {
  id: number;
  name: string;
  price: string;
  thumbnailId: number;
  merchantId: number;
  thumbnail: {
    createdAt: string;
    deletedAt: string | null;
    version: number;
    id: number;
    key: string;
    url: string;
    type: string;
    size: number;
    uploaderId: number;
  };
}

export interface StateProps {
  giftSelected: string;
  searchText: string;
  searchType: string;
  confirmModal: {
    callback: VoidFunction;
    isOpen: boolean;
    text: string;
  };
}

export interface IFormGift {
  name: string;
  price: number;
  thumbnailId: number;
  photoURL: CustomFile | string;
}

export interface IFormCreateGift {
  name: string;
  price: number;
  thumbnailId: number;
}

export interface ISearchParams {
  page: number;
  limit: number;
  searchText?: string;
  searchType?: string;
}
