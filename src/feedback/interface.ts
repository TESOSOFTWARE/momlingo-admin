import { type } from 'os';
import { CustomFile } from '../common/components/upload';

export interface IFeedbackList {
  id: number;
  content: string;
  name: boolean;
  phone: string;
  rating: string;
  createdDate: string;
  type: string;
}
export type IFeedbackCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IResListFeedback {
  items: IFeedbackList[];
  meta: {
    [key in string]: number;
  };
}
export interface IFilterForm {
  phone?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  type?: string;
}
export interface IListFeedbackParams extends IFilterForm {
  page?: number;
  limit?: number;
}
export interface IPropsTableRow {
  row: IFeedbackList;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
}
export type StateProps = {
  searchParams: IListFeedbackParams;
  confirmModal: {
    callback: VoidFunction;
    isOpen: boolean;
    text: string;
  };
};
