import { CustomFile } from '../../common/components/upload';
import { NewsStatus } from '../news-common/interface';
import { INewsDetail } from '../news-list/interface';

export interface ISubmitData {
  image: CustomFile | string;
  author: string;
  content: string;
  description: string;
  title: string;
  thumbnailId: number;
  subjectIds: number[];
  status: string;
}

export interface IDataFormEditNews {
  id: number;
  newsDetails: INewsDetail[];
  title: string;
  thumbnailId: number;
  subjectIds: number[];
  status: string;
}