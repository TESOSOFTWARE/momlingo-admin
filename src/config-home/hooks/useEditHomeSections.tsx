import { useMutation } from 'react-query';
import { editHomeSections } from '../services';

export const useEditHomeSections = () => {
  return useMutation(editHomeSections);
};
