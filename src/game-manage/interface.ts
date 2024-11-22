import { CustomFile } from '../common/components/upload';

export interface IGameForm {
  name: string;
  status: boolean | string;
  startDate: string;
  endDate: string;
  policyLink: string;
  imageId: CustomFile | number;
  gameTypeId: undefined | { id: number } | number;
  gameType?: {
    type: string;
    id: number;
  };
}
export interface IGetGameIDForm {
  id: number;
  name: string;
  status: boolean | string;
  startDate: string;
  endDate: string;
  policyLink: string;
  imageId: CustomFile | string;
  image?: {
    id: number;
    url: string;
  };
  gameType?: {
    type: string;
    id: number;
  };
}
export interface IGameList {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  image: {
    url: string;
  };
  gameType: {
    type: string;
  };
}
export type IGameCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IResListGame {
  items: IGameList[];
  meta: {
    [key in string]: number;
  };
}

export interface IListGameParams {
  page?: number;
  limit: number;
  searchText?: string | null;
}
export interface IPropsTableRow {
  row: IGameList;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
}
export type StateProps = {
  searchForm: string;
  confirmModal: {
    callback: VoidFunction;
    isOpen: boolean;
    text: string;
  };
};
