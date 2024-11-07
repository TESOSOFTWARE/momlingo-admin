// export interface StateProps {}

import { IUser } from '../../../user-management/interfaces';

export interface IUserSurveyTableProps {
  row: IUserSurvey;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onViewDetailRow: VoidFunction;
}

export type IUserSurvey = {
  user: IUserAnswer;
  actionDate: string;
};

export interface IUserAnswer {
  id: number;
  type: string;
  customer: IUser;
}
export interface IResListUserSurvey {
  items: IUserSurvey[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IParamsUserSurvey {
  page?: number;
  limit?: number;
  surveyId: number;
}
