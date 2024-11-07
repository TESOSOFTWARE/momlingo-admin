import { IUserAnswer, IUserSurvey } from '../common/interface';

export interface IResDataUserSurvey {
  user: IUserAnswer;
  userSurveyAnswer: IQuestionAnswerList[];
  actionDate: string;
}

export interface IQuestionAnswerList {
  questionContent: string;
  answers: IAnswer[];
}

export interface IAnswer {
  id: number;
  content: string;
}

export interface IParamsDetailUserSurvey {
  surveyId?: number;
  userId?: number;
}
