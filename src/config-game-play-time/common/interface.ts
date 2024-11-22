import { IPoint } from '../../config-point/list-point/interface';

export interface IPropsTableRow {
  row: IConfigPlayTimeRow;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
}

export interface IConfigPlayTimeRow {
  id: number;
  productGroup: string;
  weight: number;
  value: number;
  game?: {
    id: number;
    name: string;
  };
}

export interface IParamsSearch {
  searchText?: string;
  gameId?: number;
  page: number;
  limit: number;
}

export type StateProps = {
  gameSelected: string;
  searchText: string;
  searchGameId?: number;
  confirmModal: {
    callback: VoidFunction;
    isOpen: boolean;
    text: string;
  };
  searchProductGroupText: string;
};

export interface IGamePlayTime {
  id: number;
  productGroup: string;
  weight: number;
  value: number;
  game: {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    image: {
      url?: string;
    };
    gameGifts: {
      id: number;
      ordinal: number;
      wonQuantity: number;
      name: string;
      winRate: number;
    };
  };
}

export interface IResListGamePlayTime {
  items: IGamePlayTime[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IFormCreateConfig {
  gameId: number;
  productGroup: string;
  weight: number;
  value: number;
}

export interface IFormEditConfig {
  id: number;
  gameId: number;
  productGroup: string;
  weight: number;
  value: number;
}

export interface ISearchProductGroup {
  page: number;
  limit: number;
  isActive: boolean;
  searchText?: string;
}

export interface IFormCallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}
