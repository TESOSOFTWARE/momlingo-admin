import vn from 'src/common/locales/vn';
import * as Yup from 'yup';

export const schemaCreateSBPS = Yup.object().shape({
  // code: Yup.string().required('Vui lòng nhập thông tin'),
  quantity: Yup.number()
    .typeError('Vui lòng nhập thông tin')
    .moreThan(0, 'Vui lòng nhập thông tin')
    .lessThan(15001, 'Vui lòng nhập thông tin'),
  isActive: Yup.boolean().required('Vui lòng nhập thông tin'),
  useDate: Yup.string()
    .typeError('Vui lòng nhập thông tin')
    .required('Vui lòng nhập thông tin'),
});

export const schemaCreateSpoon = Yup.object().shape({
  productGroup: Yup.string().required('Vui lòng nhập thông tin'),
  weight: Yup.number()
    .moreThan(0, 'Vui lòng nhập thông tin')
    .required('Vui lòng nhập thông tin'),
  quantity: Yup.string().required('Vui lòng nhập thông tin'),
  useDate: Yup.string()
    .typeError('Vui lòng nhập thông tin')
    .required('Vui lòng nhập thông tin'),
  spoonType: Yup.string().required('Vui lòng nhập thông tin'),
});

export const QRNewSchema = Yup.object().shape({
  fileId: Yup.string().required('fileId is required'),
});
