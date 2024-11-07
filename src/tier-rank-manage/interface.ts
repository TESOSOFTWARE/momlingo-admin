import { CustomFile } from '../common/components/upload';

export interface ITierRankForm {
  name: string;
  description: string;
  isActive: boolean;
  conditionPoint: number;
  maxPoint: number;
  nextTierCode: string | null;
  descriptionMember:string;
  code: string;
  poinNextTierCode?:string;
}
export interface ITierRankList {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  conditionPoint: number;
  maxPoint: number;
  nextTierCode: string;
  code: string;
}
export type ITierRankCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IResListTierRank {
  items: ITierRankList[];
  meta: {
    [key in string]: number;
  };
}

export interface IListTierRankParams {
  page?: number;
  limit: number;
  search?:string  | null;
}
export interface IPropsTableRow {
  row: ITierRankList;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
}
export type StateProps = {
  searchForm: string,
  confirmModal: {
    callback: VoidFunction;
    isOpen: boolean;
    text: string;
  };
};
