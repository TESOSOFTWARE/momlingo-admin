import { useMutation } from 'react-query';
import { createNewEvent } from '../services';

export const useCreateNewWheel = () => {
  return useMutation(createNewEvent);
};
