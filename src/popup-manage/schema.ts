import * as yup from 'yup';
import { isValidURL } from '../common/constants/common.utils';
import { typeLink } from './constants';

export const schemaPopup = yup
  .object()
  .shape({
    title: yup
      .string()
      .required('Vui lòng nhập thông tin')
      .test('len', 'Tối đa 152 ký tự', (val: any) => val.length < 153),
    image: yup.mixed().required('Vui lòng nhập thông tin'),
    startDate: yup.date().typeError('Vui lòng nhập thông tin vào ô trống'),
    endDate: yup
      .date()
      .typeError('Vui lòng nhập thông tin vào ô trống')
      .min(yup.ref('startDate'), 'Ngày kết thúc không thể trước ngày bắt đầu'),
    type: yup.string().required('Vui lòng nhập thông tin'),
    link: yup
      .string()
      .when('type', (type, field) => {
        if (type === typeLink[1].value) return field.required('Vui lòng nhập thông tin');
      })
      .when('type', (type, field) => {
        return field.test('link', 'URL không hợp lệ', (value: string) => {
          if (type === typeLink[1].value) {
            return isValidURL(value as string);
          } else return true;
        });
      }),
    routing: yup.string().when('type', (type, field) => {
      if (type === typeLink[0].value) return field.required('Vui lòng nhập thông tin');
    }),
  })
  .required();
