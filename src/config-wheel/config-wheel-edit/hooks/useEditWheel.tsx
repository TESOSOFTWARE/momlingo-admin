import { useMutation } from 'react-query';
import { editWheel } from '../services';

export const useEditWheel = () => {
  return useMutation(editWheel);
};
