export interface ISubject {
  id: number;
  subjectDetails: ISubjectDetail[];
}
export interface ISubjectDetail {
  id: number;
  lang: string;
  name: string;
}

export interface ISubjectRow {
  id: number;
  name: string;
}

export interface InitialState {
  value: number;
  idDeleteNews: number[];
  showPopup: boolean;
}

export interface IDeleteParams {
  ids: number[];
}

export interface ISubjectList {
  items: ISubject[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}

export interface ISubjectParams {
  page?: number;
  limit?: number;
}

export interface IPropTableRow {
  row: ISubject;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
}
