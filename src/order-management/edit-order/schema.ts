import * as Yup from 'yup';

export const schemaEditAddress = Yup.object().shape({
  province: Yup.mixed().required('Vui lòng nhập thông tin'),
  district: Yup.mixed().required('Vui lòng nhập thông tin'),
  ward: Yup.mixed().required('Vui lòng nhập thông tin'),
  address1: Yup.string().required('Vui lòng nhập thông tin'),
});
