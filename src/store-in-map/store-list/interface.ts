export interface IResStoreList {
  items: IStoreItem[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IStoreItem {
  id: number;
  name: string;
  address: string;
  lat: number;
  long: number;
}

export interface IParams {
  page: number;
  limit: number;
  searchText?: string | null;
}

export interface IPropStoreTableRow {
  row: IStoreItem;
  selected: boolean;
  onDeleteRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onEditRow: VoidFunction;
}

export interface IDataStoreDelete {
  ids: number[];
}

export interface IStateProps {
  searchForm: string;
  confirmModal: {
    callback: VoidFunction;
    isOpen: boolean;
    text: string;
  };
  searchParams: IParams;
  isOpenPopupDelete: boolean;
}

export type ICallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};
