import * as Yup from 'yup';
export const ListUserSchema = Yup.object().shape({});

export const schemaEditUser = Yup.object().shape({
  // totalPoints: Yup.number()
  //   .typeError('Vui lòng nhập số xu')
  //   .required('Vui lòng nhập thông tin'),
  // name: Yup.string().required('Vui lòng nhập thông tin'),
  // gender: Yup.string().required('Vui lòng nhập thông tin'),
  email: Yup.string().email('Vui lòng nhập đúng định dạng email').nullable(),
    // .email()
    // .test('len', 'Vui lòng nhập đúng định dạng', (val: any) => val.length > 0),
    // .when('email', (type, field) => {
    //   if (type.length > 1) return field.email('Vui lòng nhập đúng định dạng email');
    // }),
  // address: Yup.string().required('Vui lòng nhập thông tin'),
  // birthDate: Yup.string().required('Vui lòng nhập thông tin'),
  // tierCode: Yup.string().required('Vui lòng nhập thông tin'),
});
