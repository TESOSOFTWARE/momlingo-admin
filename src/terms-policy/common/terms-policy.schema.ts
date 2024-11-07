import * as yup from 'yup';

export const schemaTermPolicy = yup
  .object()
  .shape({
    name: yup
      .string()
      .required('Vui lòng nhập thông tin')
      .test('len', 'Tối đa 152 ký tự', (val: any) => val.length < 153),
    content: yup.string(),
  })
  .required();
