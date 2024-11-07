import { number } from 'yup';
import { IResDataUserSurvey } from './interface';

export const DEFAULT_VALUE_USER_SURVEY = {
  name: '',
  actionDate: '',
  phoneNumber: '',
};

export const MOCK_DATA_USER_SURVEY = {
  id: 1,
  name: 'John Smith',
  phoneNumber: '123-456-7890',
  actionDate: '2023-03-31T10:15:00Z',
  questionAnswerList: [
    {
      question: {
        createdAt: '2023-03-01T09:00:00Z',
        updateAt: '2023-03-01T09:00:00Z',
        deletedAt: null,
        version: 1,
        id: 1,
        type: 'multiple_choice',
        content: 'What is your favorite food?',
        surveyId: 1,
      },
      answer: [
        {
          createdAt: '2023-03-10T12:00:00Z',
          updatedAt: '2023-03-10T12:00:00Z',
          deletedAt: null,
          version: 1,
          id: 1,
          content: 'Pizza',
          questionId: 1,
        },
        {
          createdAt: '2023-03-11T13:00:00Z',
          updatedAt: '2023-03-11T13:00:00Z',
          deletedAt: null,
          version: 1,
          id: 2,
          content: 'Sushi',
          questionId: 1,
        },
      ],
    },
    {
      question: {
        createdAt: '2023-03-02T09:00:00Z',
        updateAt: '2023-03-02T09:00:00Z',
        deletedAt: null,
        version: 1,
        id: 2,
        type: 'open_ended',
        content: 'What did you like about our service?',
        surveyId: 1,
      },
      answer: [
        {
          createdAt: '2023-03-15T09:00:00Z',
          updatedAt: '2023-03-15T09:00:00Z',
          deletedAt: null,
          version: 1,
          id: 3,
          content: 'The staff was friendly and helpful',
          questionId: 2,
        },
      ],
    },
  ],
};
