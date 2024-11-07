import { ISubject } from '../../news-subject/subject-list/interface';
import {
  INewsSubjectDetail,
  NewsStatus,
  SupportFileType,
} from '../news-common/interface';
export interface IResNewsList {
  items: INews[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
export interface INews {
  id: number;
  title: string;
  status: string;
  ownerId?: number;
  newsDetails: INewsDetail[];
  thumbnail: IThumbnail;
  file: IFile;
  subject: ISubject[];
}
export interface INewsDetail {
  author: string;
  content: string;
  lang?: string;
  description: string;
}
export interface IThumbnail {
  id: number;
  key: string;
  type: string;
  url: string;
  size: number;
}
export interface IFile {
  id: number;
  key: string;
  url: string;
  type: SupportFileType | string;
  size: number;
  uploaderId: number;
}

export interface INewsParams {
  fromDate?: string | null;
  toDate?: string | null;
  title?: string;
  subjectIds?: any;
  page?: number;
  limit?: number;
}

export interface INewsFilter {
  title?: string;
  subject?: string[];
  startDate?: string | null;
  endDate?: string | null;
}

export interface InitialNewsState {
  dataSearch: INewsParams;
  value: number;
  idDeleteNews: number[];
  showPopup: boolean;
}

export interface INewsRow {
  id: number;
  status: string;
  title: string;
  subject: INewsSubjectDetail[];
  updatedAt: string;
  file: {
    id: number;
    key: string;
    url: string;
    type: SupportFileType | string;
    size: number;
    uploaderId: number;
  };
}

export interface IPropTableRow {
  row: INews;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
  onDetailRow: VoidFunction;
}

export interface IDeleteParams {
  ids: number[];
}
