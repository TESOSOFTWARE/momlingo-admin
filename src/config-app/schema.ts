import * as Yup from 'yup';

export const schemaConfigApp = Yup.object().shape({
  mobileVersion: Yup.number().typeError('Vui lòng nhập thông tin').required('Vui lòng nhập thông tin'),  
});
