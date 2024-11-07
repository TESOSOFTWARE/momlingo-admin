import { CustomFile } from '../common/components/upload';

export interface IPopupForm {
  title: string;
  status: boolean;
  link: string;
  image: CustomFile | string;
  type?: string;
  routing?: string;
  startDate: string;
  endDate: string;
  ordinal: number;
}
export interface IPopupList {
  id: string;
  title: string;
  status: boolean;
  link: string;
  image: string;
  startDate: string;
  endDate: string;
  ordinal: number;
}
export type IPopupCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IResListPopup {
  popupConfig: IPopupList[];
  meta: {
    [key in string]: number;
  };
}

export interface IListPopupParams {
  page: number;
  limit: number;
}
export interface IPropsTableRow {
  row: IPopupList;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
}
export type StateProps = {
  confirmModal: {
    callback: VoidFunction;
    isOpen: boolean;
    text: string;
  };
};
