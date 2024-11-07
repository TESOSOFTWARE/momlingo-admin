export enum NewsStatus {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE',
}

export interface INewsSubjectDetail {
  id: number;
  lang: string;
  name: string;
}

export interface INewsDetail {
  author: string;
  content: string;
  lang: string;
  description: string;
}

export interface INewsSubject {
  items: [
    {
      id: number;
      userId: number;
      subjectDetails: INewsSubjectDetail[];
    }
  ];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export enum Language {
  VN = 'VN',
  EN = 'EN',
}

export enum SupportFileType {
  png = 'png',
  jpg = 'jpg',
  jpeg = 'jpeg',
  pdf = 'pdf',
  mp3 = 'mp3',
  mp4 = 'mp4',
  wav = 'wav',
  xlsx = 'xlsx',
  xls = 'xls',
  csv = 'csv',
}

export type INewsCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface INewsForm {
  id: number;
  title: string;
  status: NewsStatus;
  thumbnail: Image;
  subject: INewsSubjectDetail[];
  content: string;
}

export interface Image {
  id: number;
  key: string;
  type: string;
  size: number;
  url: string;
}
