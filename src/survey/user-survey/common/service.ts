import axiosInstance from 'src/common/utils/axios';
import { IParamsUserSurvey, IResListUserSurvey } from './interface';
import {
  API_REQUEST_EXPORT_SURVEY_HISTORY,
  API_REQUEST_EXPORT_SURVEY_HISTORY_DETAIL,
  API_SURVEY,
  API_SURVEY_HISTORY,
  API_SURVEY_HISTORY_DETAIL,
} from '../../../common/constants/apis';
import { MOCK_USER_SURVEY } from './constant';
import {
  IParamsDetailUserSurvey,
  IResDataUserSurvey,
} from '../user-survey-view/interface';

export const getListUserSurvey = (params: IParamsUserSurvey, surveyId: number) => {
  return axiosInstance.get<any, IResListUserSurvey>(`${API_SURVEY_HISTORY}`, {
    params,
  });
};

export const getDetailUserSurvey = (params: IParamsDetailUserSurvey) => {
  return axiosInstance.get<any, IResDataUserSurvey>(`${API_SURVEY_HISTORY_DETAIL}`, {
    params,
  });
};
export const requestExport = (id: number) => {
  return axiosInstance.post(`${API_REQUEST_EXPORT_SURVEY_HISTORY}`, { surveyId: id });
};
export const requestExportDetail = ({
  surveyUserId,
  surveyUserDetailId,
}: { [key in string]: number }) => {
  return axiosInstance.post(`${API_REQUEST_EXPORT_SURVEY_HISTORY_DETAIL}`, {
    surveyId: surveyUserId,
    userId: surveyUserDetailId,
  });
};
