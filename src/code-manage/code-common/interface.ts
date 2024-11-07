import { PostCreateCode } from '../code-create/create.interface';
import { IEditCode } from '../code-edit/edit.interface';
import { ISearchForm } from '../code-list/list.interface';

export enum CodeStatus {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE',
}

export interface StatePropsCodeRelease {
  isPopup: boolean;
  searchForm: ISearchForm;
  dataEditCode: IEditCode;
  dataPostCode: PostCreateCode;
  dataDeleteCode: string[];
  isOpenQRCodeModal: boolean;
}

export type ICodeCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};
