import { NewsStatus, INewsSubjectDetail, INewsDetail } from '../news-common/interface';

export interface IDetailNews {
  id: number;
  status: NewsStatus;
  title: string;
  ownerId: number;
  thumbnail: Image;
  newsDetails: INewsDetail[];
  subject: INewsSubjectDetail[];
}

export interface Image {
  id: number;
  key: string;
  type: string;
  size: number;
  url: string;
}

export interface IConvertDataDetail {
  id: number;
  status: NewsStatus;
  thumbnail: Image;
  title: string;
  description: string;
  content: string;
  ownerId: number;
  lang: string;
  subjectName: string[];
  author: string;
}
