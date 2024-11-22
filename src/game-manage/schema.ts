import * as yup from 'yup';
export const schemaGame = yup
  .object()
  .shape({
    policyLink: yup.string().required('Vui lòng nhập link'),
    name: yup
      .string()
      .required('Vui lòng nhập thông tin')
      .test('len', 'Tối đa 152 ký tự', (val: any) => val.length < 153),
    imageId: yup.mixed().required('Vui lòng nhập thông tin'),
    startDate: yup.date().typeError('Vui lòng nhập thông tin vào ô trống'),
    endDate: yup
      .date()
      .typeError('Vui lòng nhập thông tin vào ô trống')
      .min(yup.ref('startDate'), 'Ngày kết thúc không thể trước ngày bắt đầu'),
    gameType: yup
      .object()
      .required('Vui lòng nhập thông tin')
      .typeError('Vui lòng nhập thông tin')
      .test('test', 'vui lòng nhập thông tin', (val: any) => {
        return val?.id;
      }),
  })
  .required();
