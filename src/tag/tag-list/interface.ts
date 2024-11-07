export interface IResTagList {
  items: ITagItem[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface ITagItem {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface IParams {
  page: number;
  limit: number;
}

export interface IPropTagTableRow {
  row: ITagItem;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onEditRow: VoidFunction;
}

export interface IDataTagDelete {
  ids: number[];
}

export interface IStateProps {
  idsDelete: number[];
  isPopupDelete: boolean;
}

export type ICallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};
