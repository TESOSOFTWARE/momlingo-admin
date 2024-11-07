import { API_SUBJECT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { ISubjectList, ISubjectParams } from '../../news-subject/subject-list/interface';

export const getNewsSubject = (params: ISubjectParams) =>
  axiosInstance.get<unknown, ISubjectList>(`${API_SUBJECT}`);
