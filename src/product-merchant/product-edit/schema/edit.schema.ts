import * as Yup from 'yup';
import en from '../../../common/locales/en';
import vn from '../../../common/locales/vn';

const MAX_DESCRIPTION_LENGTH = 100000;
export const EditProductSchema = Yup.object().shape({
  name: Yup.string().required('required'),
  description: Yup.string()
    .required(vn.productMerchant.new.schemaDescription)
    .max(
      MAX_DESCRIPTION_LENGTH,
      `Mô tả không được vượt quá ${MAX_DESCRIPTION_LENGTH} ký tự`
    ),
  price: Yup.number().min(1, 'min 1').required('required'),
  images: Yup.array().min(1, 'min 1'),
});
