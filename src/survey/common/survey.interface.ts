export type SurveyTableProps = {
  row: Survey;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
  onViewUsers: VoidFunction;
};
export type ISurVeyForm = {
  startDate: string;
  endDate: string;
  point?: number;
  name: string;
  status: string | boolean;
  description: string;
  questionList: questionList[];
};

export type ISurVeyEditForm = {
  id?: number;
  userId?: number;
  startDate: string;
  endDate: string;
  point?: number;
  name: string;
  status: string | boolean;
  description: string;
  questionList: questionListEdit[];
};
export type questionListEdit = {
  id?: number;
  answerList: answerListEdit[];
  content: string | undefined;
  type: string;
};
export type answerListEdit = {
  id?: number;
  content: string;
};
export type questionList = {
  answerList: answerList[];
  content: string | undefined;
  type: string;
};
export type answerList = {
  content: string;
};

export type Survey = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  point: number;
  userId: number;
  questionList: IQuestion[];
};
export interface IQuestion {
  id: number;
  type: string;
  content: string;
  answerList: IAnswer[];
}

export interface IAnswer {
  id: number;
  content: string;
}
export type StateProps = {
  searchText: string;
  searchType: string;
  surveyList: Survey[];
  confirmModal: {
    callback: VoidFunction;
    isOpen: boolean;
    text: string;
  };
};

export type ISurveyCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export type ISurveySearchParam = {
  searchText?: string;
  searchType?: string;
  page: number;
  limit: number;
};

export type IResSurveys = {
  items: Survey[];
  meta: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export type IGetListSurveysParams = {
  page: number;
  limit: number;
};
