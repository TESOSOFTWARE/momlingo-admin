import { CustomFile } from '../../common/components/upload';
import { Lang } from '../../common/constants/common.interfaces';
import { TermPolicyLang, TermPolicyStatus, TermPolicyType } from './type';

// Table
export interface IPropsTableRow {
  row: ITermPolicyRow;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
  onViewRow: VoidFunction;
}

export interface ITermPolicyRow {
  id: number;
  name: string;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  lang: string;
}

export type StateProps = {
  termPolicySelected: string;
  searchText: string;
  searchType?: string;
  searchStatus?: string;
  confirmModal: {
    callback: VoidFunction;
    isOpen: boolean;
    text: string;
  };
};

export interface ISearchParams {
  page: number;
  limit: number;
  searchText?: string;
  type?: string;
  status?: string;
}

export interface ITermPolicy {
  id: number;
  status: TermPolicyStatus;
  lang: TermPolicyLang;
  type: TermPolicyType;
  createdAt: string;
  termsPolicyDetails: ITermPolicyDetail[];
  icon?: IIconTermPolicy;
}

export interface ITermPolicyDetail {
  id: number;
  lang: TermPolicyLang;
  name: string;
  content: string;
  updatedAt: string;
}

export interface IIconTermPolicy {
  id: number;
  key: string;
  url: string;
  type: string;
  size: number;
}

export interface IResTermPolicies {
  items: ITermPolicy[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IListTermPolicyTransform {
  items: ITermPolicyRow[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

// Form
export interface ISelectLangOption {
  value: number | string;
  label: string;
}

export interface ITermsPolicyDetail {
  lang: TermPolicyLang;
  name: string;
  content: string;
}

export interface INewTermsPolicy {
  type: TermPolicyType;
  status: TermPolicyStatus;
  iconId: number;
  termsPolicyDetails: [
    {
      lang: TermPolicyLang;
      name: string;
      content: string;
    }
  ];
}

export interface IUpdateTermsPolicy {
  id: number;
  type: TermPolicyType;
  status: TermPolicyStatus;
  iconId: number;
  termsPolicyDetails: [
    {
      id?: number;
      lang: TermPolicyLang;
      name: string;
      content: string;
    }
  ];
}

export interface ICreateTermsPolicy {
  type: TermPolicyType;
  status: TermPolicyStatus;
  iconId: number;
  termsPolicyDetails: [
    {
      lang: TermPolicyLang;
      name: string;
      content: string;
    }
  ];
}

// View one
export interface IResFile {
  id: number;
  key: string;
  type: string;
  url: string;
}

export interface IResTermPolicy {
  id: number;
  status: TermPolicyStatus;
  type: TermPolicyType;
  createdAt: string;
  termsPolicyDetails: IResTermsPolicyDetail[];
  icon: IResFile;
}

export interface ITermPolicyTransform {
  id: number;
  status: TermPolicyStatus;
  type: TermPolicyType;
  createdAt: string;
  termsPolicyDetailId: number;
  lang: TermPolicyLang;
  name: string;
  content: string;
  updatedAt: string;
  iconUrl: string;
  iconId: number;
}

export interface IResTermsPolicyDetail {
  id: number;
  name: string;
  content: string;
  lang: TermPolicyLang;
  updatedAt: string;
}

export interface ITermPolicyForm {
  name: string;
  status: boolean;
  lang: TermPolicyLang;
  type: TermPolicyType;
  content: string;
  icon: CustomFile | string;
}

export interface IUpdateTermPolicyForm {
  id: number;
  status: boolean;
  type: TermPolicyType;
  lang: TermPolicyLang;
  termPolicyDetailId?: number;
  name: string;
  content: string;
  icon: CustomFile | string;
}
