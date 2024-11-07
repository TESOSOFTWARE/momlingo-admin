import { API_MERCHANT_REGISTER } from 'src/common/constants/apis';
import axios from 'src/common/utils/axios';
import { IFormRegister } from './register.interface';

export const getRegister = (data: IFormRegister) => {
  return axios.post(API_MERCHANT_REGISTER, data);
};
